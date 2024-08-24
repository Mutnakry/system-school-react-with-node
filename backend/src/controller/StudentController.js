const db = require("../utile/db");
const fs = require('fs');
const path = require('path');
// const image = require('../../public/image')



exports.GetAllData = (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const searchQuery = req.query.search_query || "";
    const offset = (page - 1) * limit;

    // Query to get the total number of items that match the search query
    const countQuery = `
        SELECT COUNT(*) AS total 
        FROM student 
        WHERE fkh_names LIKE ? OR lkh_name LIKE ?
    `;
    db.query(countQuery, [`%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
        if (err) {
            console.error('Error fetching count:', err);
            return res.status(500).json({ error: 'Database query error' });
        }

        const totalCategory = results[0].total;
        const totalPages = Math.ceil(totalCategory / limit);

        // Query to get the paginated and filtered data
        const selectQuery = `
             SELECT stu.id as stuid, mo.kh_name as mother_names,mo.en_name as Enmother_names,room.names,room.names,stu.*
            FROM student as stu 
            inner join classroom as room on  stu.clsss_id = room.id
            inner join mother as mo on stu.mother_id = mo.id
            WHERE fkh_names LIKE ? OR lkh_name LIKE ?
            ORDER BY id DESC
            LIMIT ? OFFSET ?
        `;
        db.query(selectQuery, [`%${searchQuery}%`, `%${searchQuery}%`, limit, offset], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ error: 'Database query error' });
            }

            res.json({
                category: results,
                totalPages,
                currentPage: page,
                totalCategory,
            });
        });
    });
};

// Delete category
exports.Deletestudent = (req, res) => {
    const { id } = req.params;

    // Delete the image file associated with the category
    db.query('SELECT image FROM student WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send('Error fetching image');
        const image = result[0].image;
        if (image) {
            fs.unlink(path.join(__dirname, '../public/image', image), err => {
                if (err) console.log('Failed to delete image:', err);
            });
        }
    });

    const query = 'DELETE FROM student WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting category');
        }
        res.json(result);
    });
};

  /// inser student
exports.CreateStudent = async (req, res) => {
    try {
        const { motherId, students } = req.body;

        // Insert mother details into the 'mother' table if motherId is not provided
        let motherIdFromDB = motherId;
        if (!motherId) {
            const { M_kh_name, M_en_name, M_age, M_address, M_phone, M_email, M_gender } = req.body;
            const sqlMother = `
                INSERT INTO mother (kh_name, en_name, age, address, phone, email, gender) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const motherValues = [M_kh_name, M_en_name, M_age, M_address, M_phone, M_email, M_gender];
            const [motherResult] = await db.promise().query(sqlMother, motherValues);
            motherIdFromDB = motherResult.insertId;
        }

        // Insert student details into the 'student' table
        const { fkh_names, lkh_name, fen_name, len_name, gender, dob, age, phone, address, email, clsss_id} = students;
        const image = req.file ? req.file.filename : null;

        const sqlStudent = `
            INSERT INTO student 
            (fkh_names, lkh_name, fen_name, len_name, gender, dob, age, phone, address, email,clsss_id, mother_id, image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
        `;
        const studentValues = [fkh_names, lkh_name, fen_name, len_name, gender, dob, age, phone, address, email,clsss_id, motherIdFromDB, image];
        await db.promise().query(sqlStudent, studentValues);

        res.status(201).json({ message: 'Student created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the student' });
    }
};

// update student
exports.UpdateStudent = (req, res) => {
    const { id } = req.params;
    const { fkh_names, lkh_name, fen_name, len_name, gender, dob, age, phone, address, email, clsss_id } = req.body;
    let newImage = req.file ? req.file.filename : null;

    // Query to get the old image
    db.query('SELECT image FROM student WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error fetching old image:', err);
            return res.status(500).send('Error fetching old image');
        }
        if (!result || result.length === 0) {
            return res.status(404).send('Student not found');
        }

        const oldImage = result[0].image;

        // If a new image is provided
        if (newImage) {
            // Delete the old image file
            if (oldImage) {
                fs.unlink(path.join(__dirname, '../../public/image', oldImage), err => {
                    if (err) console.log('Failed to delete old image:', err);
                });
            }
            // Update the student with the new image
            db.query('UPDATE student SET fkh_names=?, lkh_name=?, fen_name=?, len_name=?, gender=?, dob=?, age=?, phone=?, address=?, email=?, clsss_id=?, image=?  WHERE id = ?', 
            [fkh_names, lkh_name, fen_name, len_name, gender, dob, age, phone, address, email, clsss_id, newImage, id], 
            (err, result) => {
                if (err) {
                    console.error('Error updating student:', err);
                    return res.status(500).send('Error updating student');
                }
                res.json(result);
            });
        } else {
            // If no new image is provided, use the old image
            db.query('UPDATE student SET fkh_names=?, lkh_name=?, fen_name=?, len_name=?, gender=?, dob=?, age=?, phone=?, address=?, email=?, clsss_id=?,  image=?  WHERE id = ?', 
            [fkh_names, lkh_name, fen_name, len_name, gender, dob, age, phone, address, email, clsss_id, oldImage, id], 
            (err, result) => {
                if (err) {
                    console.error('Error updating student:', err);
                    return res.status(500).send('Error updating student');
                }
                res.json(result);
            });
        }
    });
};






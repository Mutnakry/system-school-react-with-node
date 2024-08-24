const db = require("../utile/db");

// const GetAllData = (req, res) => {
//     const sql = "SELECT * FROM teacher";
//     db.query(sql, (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json(results);
//     });
// }

exports.Create = (req, res) => {
    const { kh_name, en_name, gender, dob, phone, address, subject, salary, status } = req.body;

    const query = `INSERT INTO teacher (kh_name, en_name, gender, dob, phone, address, subject, salary, status)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [kh_name, en_name, gender, dob, phone, address, subject, salary, status], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.status(201).json({ message: 'Record inserted successfully', result });
    });
}

exports.GetSingleID = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM teacher WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json(result[0]);
    });
}

exports.Update = (req, res) => {
    const { id } = req.params;
    const { kh_name, en_name, gender, dob, phone, address, subject, salary, status } = req.body;

    const query = `UPDATE teacher
                   SET kh_name = ?, en_name = ?, gender = ?, dob = ?, phone = ?, address = ?, subject = ?, salary = ?, status = ?
                   WHERE id = ?`;

    db.query(query, [kh_name, en_name, gender, dob, phone, address, subject, salary, status, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record updated successfully' });
    });
}


exports.DeleteTeacher = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM teacher WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    });
}

exports.GetAllData = (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const searchQuery = req.query.search_query || "";
    const offset = (page - 1) * limit;

    // Query to get the total number of items that match the search query
    const countQuery = `
        SELECT COUNT(*) AS total 
        FROM teacher 
        WHERE kh_name LIKE ? OR en_name LIKE ?
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
            SELECT * 
            FROM teacher 
            WHERE kh_name LIKE ? OR en_name LIKE ?
            ORDER BY id DESC
            LIMIT ? OFFSET ?
        `;
        db.query(selectQuery, [`%${searchQuery}%`, `%${searchQuery}%`, limit, offset], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ error: 'Database query error' });
            }

            res.json({
                teacher: results,
                totalPages,
                currentPage: page,
                totalCategory,
            });
        });
    });
};


// exports.GetAllData = (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const searchQuery = req.query.search_query || "";
//     const offset = (page - 1) * limit;

//     // Query to get total number of items that match the search
//     const countQuery = 'SELECT COUNT(*) AS total FROM teacher WHERE kh_name LIKE ? OR en_name LIKE ? ';
//     db.query(countQuery, [`%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Database query error' });
//         }
//         const totalCategory = results[0].total;
//         const totalPages = Math.ceil(totalCategory / limit);

//         // Query to get the paginated and filtered data
//         const selectQuery = 'SELECT * FROM teacher WHERE kh_name LIKE ? OR en_name LIKE ? LIMIT ?  OFFSET ?';
//         db.query(selectQuery, [`%${searchQuery}%`, `%${searchQuery}%`, limit, offset], (err, results) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: 'Database query error' });
//             }
//             res.json({
//                 teacher: results,
//                 totalPages,
//                 currentPage: page,
//                 totalCategory,
//             });
//         });
//     });
// };




// module.exports = { GetAllData, Create, GetSingleID, Update, DeleteTeacher };

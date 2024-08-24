const { query, json } = require("express");
const db = require("../utile/db");

exports.Create = (req, res) => {
    const { names, teacher, table } = req.body;

    const query = 'INSERT INTO classroom (`names`, `teacher_id`, `table`) VALUES (?, ?, ?)'

    db.query(query, [names, teacher, table], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.status(201).json({ message: 'Record inserted successfully', result });
    });
}


exports.GetAllData = (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const searchQuery = req.query.search_query || "";
    const offset = (page - 1) * limit;

    // Query to get the total number of items that match the search query
    const countQuery = `
        SELECT COUNT(room.id) AS total 
        FROM classroom as room inner join teacher as te on room.teacher_id=te.id
        WHERE room.names LIKE ? OR te.Kh_name LIKE ?
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
            SELECT room.id as roomid,te.id as id, room.names,te.kh_name,room.table,room.status as roomstatus,room.teacher_id
            FROM classroom as room inner join teacher as te on room.teacher_id=te.id
            WHERE room.names LIKE ? OR te.kh_name LIKE ?
            ORDER BY room.id DESC
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




// exports.GetDataSingle=(req,res)=>{
//     const {id} = req.params;
//     const sql ="select * from classroom where id=?";
//     db.query(sql,[id],(err,result)=>{
//         res.json(result[0])
//     })
// }
exports.GetDataSingle = (req, res) => {
    const { id } = req.params;
    const sql = "select * from classroom where id=?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(result[0]);
    });
};



exports.DeleteData = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM classroom WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database query failed:', err.message);
            return res.status(500).json({ error: 'Failed to delete record' });
        }
        res.status(200).json({ message: 'Record deleted successfully', result });
    });
};



exports.UpdateData = (req, res) => {
    const { id } = req.params;
    const { names, teacher, table,status } = req.body; // Extract variables from req.body

    const query = 'UPDATE classroom SET `names`=?, `teacher_id`=?, `table`=? ,`status`=? WHERE `id`=?';

    db.query(query, [names, teacher, table,status, id], (err, result) => {
        if (err) {
            console.error('Database query failed:', err.message);
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Check if any rows were affected (i.e., the update was successful)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found or no changes made' });
        }

        res.status(200).json({ message: 'Record updated successfully', result });
    });
};

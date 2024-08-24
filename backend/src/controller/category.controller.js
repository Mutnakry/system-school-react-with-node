
const db = require("../utile/db");
// const Category = require("../models/CategoryModel")

// show data student
const getAll = (req, res) => {
    const sql = "SELECT * FROM categories";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}

module.exports={getAll}
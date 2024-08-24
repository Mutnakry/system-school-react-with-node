const mysql = require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    // database:"System_pos_node",
    database:"school_system",
    port:"3306",
    dateStrings: 'don'

})

module.exports=db;
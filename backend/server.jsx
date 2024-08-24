const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./src/utile/db'); // Your database utility file
const app = express();
const path = require('path');
const port = 6700;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to handle CORS

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Import and use the category routes
const category = require("./src/route/category.route");
category(app);

// Import and use the authentication routes
const authRoutes = require('./src/route/authRoute');
app.use('/api/auth', authRoutes);

// Import and use the Teacher routes
const TeacherRouter = require('./src/route/TeacherRouter');
app.use('/api/teacher', TeacherRouter);

// Import and use the classroom routes
const ClassroomRouter = require('./src/route/ClassroomRouter');
app.use('/api/classroom', ClassroomRouter);

// Import and use the classroom routes
const StudentRouter = require('./src/route/StudentRouter');
app.use('/api/student', StudentRouter);
// get image static files show in front end
app.use('/image', express.static(path.join(__dirname, 'public/image')));



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



/// run auto
// npm run dev 

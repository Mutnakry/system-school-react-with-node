// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const db = require('../utile/db'); // Import your database utility

// // Register user
// exports.register = (req, res) => {
//   const { names, email, pass, rol } = req.body; // Extract user details from the request body
  
//   // Hash the password
//   const hashedPassword = bcrypt.hashSync(pass, 8);

//   // SQL query to insert the user into the database
//   const query = 'INSERT INTO user (names, email, pass, rol) VALUES (?, ?, ?, ?)';
  
//   // Execute the query with the user details
//   db.query(query, [names, email, hashedPassword, rol], (err, result) => {
//     if (err) {
//       // Handle any errors that occur during the query
//       return res.status(500).send('Error registering user');
//     }
//     // Respond with a success message if the user is registered successfully
//     res.status(201).send('User registered successfully');
//   });
// };



// // // Middleware to check if the user is authenticated
// // const verifyToken = (req, res, next) => {
// //   const token = req.headers['x-auth-token'] || req.headers['authorization'];
// //   if (!token) return res.status(403).send('No token provided.');

// //   jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
// //     if (err) return res.status(401).send('Failed to authenticate token.');
// //     req.userId = decoded.id;
// //     req.userRole = decoded.rol;
// //     next();
// //   });
// // };

// // // Use verifyToken middleware on protected routes
// // app.get('/api/protected', verifyToken, (req, res) => {
// //   // Your protected route logic
// // });


// // Login user
// exports.login = (req, res) => {
//   const { email, pass } = req.body;

//   // SQL query to find the user by email
//   const query = 'SELECT * FROM user WHERE email = ?';
  
//   // Execute the query with the provided email
//   db.query(query, [email], (err, results) => {
//     if (err) {
//       return res.status(500).send('Error logging in');
//     }
//     if (results.length === 0) {
//       return res.status(404).send('User not found');
//     }

//     const user = results[0];
//     // Compare the provided password with the hashed password
//     const isPasswordValid = bcrypt.compareSync(pass, user.pass);

//     if (!isPasswordValid) {
//       return res.status(401).send('Invalid password');
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ id: user.id, rol: user.rol }, 'your_jwt_secret', { expiresIn: 86400 }); // 24 hours

//     // Respond with the token and user details
//     res.status(200).send({ auth: true, token, rol: user.rol, names: user.names });
//   });
// };


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../utile/db'); // Import your database utility

// Register user
exports.register = async (req, res) => {
  try {
    const { names, email, pass, rol } = req.body;
    const hashedPassword = await bcrypt.hash(pass, 8);
    const query = 'INSERT INTO user (names, email, pass, rol) VALUES (?, ?, ?, ?)';
    await db.query(query, [names, email, hashedPassword, rol]);
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

// Login user
exports.login = (req, res) => {
  const { email, pass } = req.body;

  // SQL query to find the user by email
  const query = 'SELECT * FROM user WHERE email = ?';
  
  // Execute the query with the provided email
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send('Error logging in');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    // Compare the provided password with the hashed password
    const isPasswordValid = bcrypt.compareSync(pass, user.pass);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, rol: user.rol }, 'your_jwt_secret', { expiresIn: 86400 }); // 24 hours

    // Respond with the token and user details
    res.status(200).send({ auth: true, token, rol: user.rol, names: user.names });
  });
};




// Middleware to check if the user is authenticated
exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-auth-token'] || req.headers['authorization'];
  if (!token) return res.status(403).send('No token provided.');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Failed to authenticate token.');
    req.userId = decoded.id;
    req.userRole = decoded.rol;
    next();
  });
};

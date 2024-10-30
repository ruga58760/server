// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL password
  database: 'appeals_db', // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// POST endpoint to save form data
app.post('/api/save-data', (req, res) => {
  const { additionalInfo, fullName, personalEmail, businessEmail, mobileNumber, facebookPageName } = req.body;

  // Log received data
  console.log('Received data:', req.body);

  const sql = `INSERT INTO appeals (additionalInfo, fullName, personalEmail, businessEmail, mobileNumber, facebookPageName) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [additionalInfo, fullName, personalEmail, businessEmail, mobileNumber, facebookPageName], (err, result) => {
    if (err) {
      console.error('Error saving data to database:', err);
      return res.status(500).send('Error saving data');
    }
    console.log('Data saved successfully:', result); // Log result for verification
    res.send('Data saved successfully');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'studentDB'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Routes
app.get('/students', (req, res) => {
  const sql = 'SELECT * FROM students';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/students', (req, res) => {
  const sql = 'INSERT INTO students SET ?';
  const newStudent = req.body;
  db.query(sql, newStudent, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...newStudent });
  });
});

app.put('/students/:id', (req, res) => {
  const sql = 'UPDATE students SET ? WHERE id = ?';
  const updatedStudent = req.body;
  const { id } = req.params;
  db.query(sql, [updatedStudent, id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.delete('/students/:id', (req, res) => {
  const sql = 'DELETE FROM students WHERE id = ?';
  const { id } = req.params;
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

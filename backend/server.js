// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5003;

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '4DOTZ2naliya', // Replace with your MySQL password
  database: 'truYum' // Replace with your MySQL database name
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Define an endpoint to fetch all menu items for admin
app.get('/api/admin-menu-items', (req, res) => {
  const query = 'SELECT * FROM menu_items';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching menu items:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Define an endpoint to fetch menu items for customers
app.get('/api/customer-menu-items', (req, res) => {
  const query = `
    SELECT * FROM menu_items
    WHERE active = TRUE AND date_of_launch <= CURDATE()
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching menu items:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Define an endpoint to update a menu item
app.put('/api/menu-items/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, active, date_of_launch, category, free_delivery } = req.body;
  const query = `
    UPDATE menu_items
    SET name = ?, price = ?, active = ?, date_of_launch = ?, category = ?, free_delivery = ?
    WHERE id = ?
  `;
  db.query(query, [name, price, active, date_of_launch, category, free_delivery, id], (err, results) => {
    if (err) {
      console.error('Error updating menu item:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json({ id, name, price, active, date_of_launch, category, free_delivery });
  });
});

// Define an endpoint to delete a menu item
app.delete('/api/menu-items/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM menu_items WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting menu item:', err);
      res.status(500).send('Server error');
      return;
    }
    res.sendStatus(204); // No Content
  });
});

// Define an endpoint to add a new menu item
app.post('/api/menu-items', (req, res) => {
  const { name, price, active, date_of_launch, category, free_delivery } = req.body;
  const query = `
    INSERT INTO menu_items (name, price, active, date_of_launch, category, free_delivery)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [name, price, active, date_of_launch, category, free_delivery], (err, results) => {
    if (err) {
      console.error('Error adding menu item:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json({ id: results.insertId, name, price, active, date_of_launch, category, free_delivery });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
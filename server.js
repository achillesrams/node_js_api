const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;

// Allow requests from localhost:4200
app.use(cors({ origin: 'http://localhost:4200' }));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'API',
  password: 'P@ssw0rd',
  port: 5432,
});

app.use(cors({ origin: 'http://localhost:4200' }));



app.get('/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const data = result.rows;
    client.release();
    res.json(data);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error retrieving data');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
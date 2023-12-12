const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Luckykk88!',
  database: 'employees',
});

dbConnection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.');
});

module.exports = dbConnection;

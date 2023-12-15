const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  host: 'localhost3000/',
  user: 'root',
  password: 'Luckykk88!',
  database: 'employees',
});

dbConnection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the db.');
});

module.exports = dbConnection;

const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'sql5.freesqldatabase.com',
        user: 'sql5421276',
        password: 'ZXJ9HH7Hvz',
        database: 'sql5421276'
    });
};

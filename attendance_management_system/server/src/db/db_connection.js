const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'attendance_management_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const dbConnection = async () => {
    try {
        return await pool.getConnection();
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
};

module.exports = dbConnection;

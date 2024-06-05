const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('../db/db_connection'); // Adjusted path

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/attendance', async (req, res) => {
    try {
        const connection = await dbConnection();
        const query = 'SELECT `en_no` FROM `student`';
        const [results] = await connection.query(query);
        connection.release();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.post('/attendance', async (req, res) => {
    try {
        const connection = await dbConnection();
        const records = req.body.records;
        const subjectName = req.body.subjectName;

        for (const record of records) {
            const { en_no: enrollmentNumber, attendance, date } = record;

            const formattedDate = new Date(date).toLocaleDateString('en-GB');

            const query = `INSERT INTO attendance (en_no, status, date, subject) VALUES (?, ?, ?, ?)
                  ON DUPLICATE KEY UPDATE status = ?, date = ?, subject = ?`;

            await connection.query(query, [enrollmentNumber, attendance, formattedDate, subjectName, attendance, formattedDate, subjectName]);
        }

        connection.release();
        res.status(200).send('Attendance recorded successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});



module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('../db/db_connection'); // Adjusted path

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Endpoint to save profile data
router.post('/profile', async (req, res) => {
    try {
        const connection = await dbConnection();
        const { name, facultyId, department, phoneNumber } = req.body;

        const query = `INSERT INTO profile (fname, fid, dep, phno) VALUES (?, ?, ?, ?)`;
        await connection.query(query, [name, facultyId, department, phoneNumber]);

        connection.release();
        res.status(200).send('Profile data saved successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// Endpoint to fetch profile data based on facultyId
router.get('/profile/:facultyId', async (req, res) => {
    try {
        const connection = await dbConnection();
        const { facultyId } = req.params;

        const query = `SELECT * FROM profile WHERE fid = ?`;
        const [profileData] = await connection.query(query, [facultyId]);

        connection.release();
        res.status(200).json(profileData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
router.put('/profile/:facultyId', async (req, res) => {
    try {
        const connection = await dbConnection();
        const { name, department, phoneNumber } = req.body;
        const { facultyId } = req.params;

        const query = `UPDATE profile SET fname = ?, dep = ?, phno = ? WHERE fid = ?`;
        await connection.query(query, [name, department, phoneNumber, facultyId]);

        connection.release();
        res.status(200).send('Profile data updated successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

module.exports = router;

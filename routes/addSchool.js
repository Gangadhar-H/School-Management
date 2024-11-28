const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/addSchool', (req, res, err) => {
    const { name, address, latitude, longitude } = req.body;
    // console.log(name, address, latitude, longitude);
    // Validating input data
    if (!name || !address || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ message: 'Latitude and Longitude must be numbers.' });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const values = [name, address, parseFloat(latitude), parseFloat(longitude)];

    db.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err });
        }
        res.status(201).json({ message: 'School added successfully!', schoolId: result.insertId });
    });
});

module.exports = router;

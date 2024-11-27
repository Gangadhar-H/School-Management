const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and Longitude are required.' });
    }

    const userLat = parseFloat(latitude);
    const userLong = parseFloat(longitude);

    const query = 'SELECT * FROM schools';

    db.query(query, (err, schools) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err });
        }

        // Calculating distances and sort by proximity
        const sortedSchools = schools.map(school => {
            const distance = calculateDistance(userLat, userLong, school.latitude, school.longitude);
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    });
});

// function to calculate distance 
function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRad = angle => (angle * Math.PI) / 180;
    const R = 6371; // Radius of Earth in kilometers

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

module.exports = router;

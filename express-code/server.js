const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const pool = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

// function to convert degrees to radians
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Function to calculate distance between two points using the haversine formula
function calculateDistance(lat1, lng1, lat2, lng2) {
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

app.get('/api/density', async (req, res) => {
  try {
    const { swLat, swLng, neLat, neLng } = req.query;

    // Query to count points within the bounding box
    const countQuery = `
      SELECT COUNT(*) FROM locations 
      WHERE 
        Latitude BETWEEN ${parseFloat(swLat)} AND ${parseFloat(neLat)} 
        AND Longitude BETWEEN ${parseFloat(swLng)} AND ${parseFloat(neLng)};
    `;

    const countResult = await pool.query(countQuery);
    const count = parseInt(countResult.rows[0].count, 10);

    // Calculate the width (East-West distance) and height (North-South distance) of the bounding box
    const width = calculateDistance(parseFloat(swLat), parseFloat(swLng), parseFloat(swLat), parseFloat(neLng));
    const height = calculateDistance(parseFloat(swLat), parseFloat(swLng), parseFloat(neLat), parseFloat(swLng));

 // Calculate the area of the rectangle in square kilometers
const area = width * height;

    // Calculate the density
    const density = count / area;

    // Normalize the density value on a scale from 0 to 100
    // Adjust the MAX_DENSITY value as per your data range and requirements
    const MAX_DENSITY = 4000; // This should be the maximum expected density value for your application
    const normalizedDensity = (density / MAX_DENSITY) * 100;

    // Limit the value to a maximum of 100%
    const densityPercentage = Math.min(normalizedDensity, 100);

    // Send the density back to the frontend
    res.json({
      message: "Density value calculated successfully.",
      densityPercentage: densityPercentage
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

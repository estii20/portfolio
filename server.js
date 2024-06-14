const express = require('express');
const path = require('path');
require('dotenv').config(); // Ensure dotenv is required

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Access the API key from environment variables

// Debugging statement to ensure the API key is loaded
console.log(`Google Maps API Key: ${apiKey}`);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve index.html on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to proxy Google Maps requests
app.get('/maps', async (req, res) => {
  const location = req.query.location || 'Monfalcone, Italy';
  const url = `https://www.google.com/maps/embed/v1/place?q=${location}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).send('Error fetching Google Maps data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

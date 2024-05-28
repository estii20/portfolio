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

// Serve the map with the API key
app.get('/map', (req, res) => {
  res.send(`
    <iframe style="height:100%;width:100%;border:0;" 
      frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=Monfalcone,+Italy&key=${apiKey}">
    </iframe>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

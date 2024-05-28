const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

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

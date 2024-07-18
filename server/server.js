const express = require('express');
const app = express();
const cors = require("cors");
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const port = 5000;

// Middleware
app.use(cors());

// Accessing API Key
const API_KEY = process.env.VITE_APP_API_KEY;


// Steam server list endpoint
app.get('/api/servers', (req, res) => {
    axios.get(`https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${API_KEY}`)
    .then(response => {
        console.log('Server List Response:', response.data); // Log response data to console
        res.send(response.data); // Send response data to client
    })
    .catch(error => {
        console.error('Error fetching servers:', error);
        res.status(500).send('Error fetching servers');
    });
});

// Counter-strike stats API num players
app.get('/api/stats/:appid', (req, res) => {
    const defaultAppId = '730'; // Default app ID for Counter-Strike
    const appId = req.params.appid || defaultAppId;
    axios.get(`http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`)
        .then(response => {
            res.json(response.data); // Sending JSON response
        })
        .catch(error => {
            console.error('Error fetching player stats:', error.message);
            res.status(500).send('Error fetching player stats');
        });
});

// 404 - Not Found handler
app.use((req, res, next) => {
    res.status(404).send('Sorry, can\'t find that!');
});

// 500 - Internal Server Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Optional: Display server spinners
const emoji = require('node-emoji');
const spinners = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']; // Simplified spinner characters
const serverLink = `http://localhost:${port}`;

function spin() {
    process.stdout.write(`\r${spinners[Math.floor(Math.random() * spinners.length)]} Server is running at ${serverLink} ${emoji.get('sparkles')} `);
}

setInterval(spin, 5); // Spin every 1ms

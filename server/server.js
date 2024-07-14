const express = require('express');
const app = express();
const cors = require("cors");
const axios = require('axios');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

var port = 5000;

// ********** MIDDLEWARE **********
app.use(cors());
require('dotenv').config()
API_KEY = process.env.VITE_APP_API_KEY

// Store the server list
let serverList = [];

// Master server address
const masterServerAddress = 'hl2master.steampowered.com';
const masterServerPort = 27011;

// Query packet to request server list
const queryPacket = Buffer.from([0x31, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

server.on('message', (msg, rinfo) => {
    // Process the response and update the server list
    serverList = [];

    // Skip the header and parse the IP addresses and ports
    for (let i = 6; i < msg.length; i += 6) {
        const ip = `${msg[i]}.${msg[i+1]}.${msg[i+2]}.${msg[i+3]}`;
        const port = (msg[i+4] << 8) | msg[i+5];
        serverList.push(`${ip}:${port}`);
    }

    console.log('Server list updated:', serverList);

    server.close();
});

server.on('error', (err) => {
    console.log(`Server error:\n${err.stack}`);
    server.close();
});

// Send the query packet to the master server
server.send(queryPacket, 0, queryPacket.length, masterServerPort, masterServerAddress, (err) => {
    if (err) {
        console.log(`Error sending query: ${err}`);
        server.close();
    } else {
        console.log('Query sent to master server');
    }
});

// Endpoint to fetch the server list
app.get('/api/servers', (req, res) => {
    res.json(serverList);
});

// Counter-strike stats API num players
app.get('/api/stats/:appid', (req, res) => {
    const defaultappid = '730'; // set a default value for the app id
    const appid = req.params.appid || defaultappid;
    axios.get(`http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appid}`)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
});

// ********** 404 and 500 handlers **********

// Handler for 404 - Resource Not Found
app.use(function(req, res, next) {
    res.status(404).send('Sorry, can\'t find that!' + emoji.get('t-rex'));
});

// Handler for 500 - Server Error
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!' + emoji.get('poop'));
});

// ********** NODE EMOJI **********
const emoji = require('node-emoji');

// ********** SPINNER **********
class serverSpinner {
    spin() {
        const serverSpinner = require('cli-spinners');
        const frames = serverSpinner.dots.frames;
        let i = 0;
        setInterval(() => {
            process.stdout.write(`\r${frames[i = ++i % frames.length]} Server is running on port ` + port + ` ` + new Date().toLocaleString() + `  ` + emoji.get('crystal_ball') + ` `
            );
        }, 100);
    }
}

// ********** SERVER **********
app.listen(port, () => {
    console.log(new serverSpinner().spin());
});

const express = require('express');
const app = express();
const cors = require("cors");
const axios = require('axios');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const A2S_INFO_QUERY = Buffer.from([0xFF, 0xFF, 0xFF, 0xFF, 0x54, 0x53, 0x6F, 0x75, 0x72, 0x63, 0x65, 0x20, 0x45, 0x6E, 0x67, 0x69, 0x6E, 0x65, 0x20, 0x51, 0x75, 0x65, 0x72, 0x79, 0x00]);

var port = 5000;

// ********** MIDDLEWARE **********
app.use(cors());
require('dotenv').config();
API_KEY = process.env.VITE_APP_API_KEY;

// Store the server list
let serverList = [];

// Master server address
const masterServerAddress = 'hl2master.steampowered.com';
const masterServerPort = 27011;

// Query packet to request server list
const queryPacket = Buffer.from([0x31, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

server.on('message', async (msg, rinfo) => {
    // Process the response and update the server list
    serverList = [];

    // Skip the header and parse the IP addresses and ports
    for (let i = 6; i < msg.length; i += 6) {
        const ip = `${msg[i]}.${msg[i + 1]}.${msg[i + 2]}.${msg[i + 3]}`;
        const port = (msg[i + 4] << 8) | msg[i + 5];
        serverList.push({ ip, port });
    }

    console.log('Server list updated:', serverList);

    for (const server of serverList) {
        try {
            const details = await getServerDetails(server.ip, server.port);
            server.details = details;
        } catch (error) {
            console.error(`Error fetching details for ${server.ip}:${server.port}`, error);
        }
    }

    console.log('Server list with details:', serverList);

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

async function getServerDetails(ip, port) {
    return new Promise((resolve, reject) => {
        const client = dgram.createSocket('udp4');
        const address = ip.split('.').map(Number);
        const portBuffer = Buffer.from([port & 0xFF, port >> 8]);

        client.on('message', (msg, rinfo) => {
            const details = parseA2SInfoResponse(msg);
            resolve(details);
            client.close();
        });

        client.on('error', (err) => {
            reject(err);
            client.close();
        });

        client.send(A2S_INFO_QUERY, 0, A2S_INFO_QUERY.length, port, ip, (err) => {
            if (err) {
                reject(err);
                client.close();
            }
        });
    });
}

function parseA2SInfoResponse(msg) {
    let details = {};
    let i = 4;
    details.protocol = msg[i++];
    details.name = readString(msg, i);
    i += details.name.length + 1;
    details.map = readString(msg, i);
    i += details.map.length + 1;
    details.folder = readString(msg, i);
    i += details.folder.length + 1;
    details.game = readString(msg, i);
    i += details.game.length + 1;
    details.id = msg.readUInt16LE(i);
    i += 2;
    details.players = msg[i++];
    details.maxPlayers = msg[i++];
    details.bots = msg[i++];
    details.serverType = String.fromCharCode(msg[i++]);
    details.environment = String.fromCharCode(msg[i++]);
    details.visibility = msg[i++];
    details.vac = msg[i++];
    details.version = readString(msg, i);
    return details;
}

function readString(buffer, start) {
    let end = start;
    while (buffer[end] !== 0x00) {
        end++;
    }
    return buffer.toString('utf8', start, end);
}

// Endpoint to fetch the server list
app.get('/api/servers', (req, res) => {
  const activeServers = serverList.length;
  res.json({ activeServers, servers: serverList });
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
app.use(function (req, res, next) {
    res.status(404).send('Sorry, can\'t find that!' + emoji.get('t-rex'));
});

// Handler for 500 - Server Error
app.use(function (err, req, res, next) {
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

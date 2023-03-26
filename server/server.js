const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());

// your other middleware and routes here



const axios = require('axios');

app.get('/api/steam/:username', (req, res) => {
    const username = req.params.username;
    const API_KEY = "36F973D22488B43ED55D9E1719A1F3E3";

    axios
    .get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${API_KEY}&vanityurl=${username}`)
    .then(response => {
      const data = response.data;
      if (data.response.success === 1) {
        const steamId = data.response.steamid;
        res.send({ steamId });
        console.log(steamId);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    });
});


app.get('/api/steam/user/:steamId', (req, res) => {
    const steamId = req.params.steamId;
    const API_KEY = "36F973D22488B43ED55D9E1719A1F3E3";

    axios
    .get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamId}`)
    .then(response => {
        const data = response.data;
        if (data.response.players.length > 0) {
            const player = data.response.players[0];
            res.send({ player });
            console.log(player);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    });
});


//front end will send a request to the server with the username with the following format
//http://localhost:5000/api/steam/username

// ********** 404 and 500 handlers **********


//handler for 404 - Resource Not Found
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!' + emoji.get('t-rex'));
});
//handler for 500 - Server Error
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!' + emoji.get('poop'));
});

// ********** NODE EMOJI **********

const emoji = require('node-emoji');
// node emoji's link https://www.npmjs.com/package/node-emoji
// spinnerCLI link https://www.npmjs.com/package/cli-spinners

// ********** SPINNER **********
class serverSpinner {
    spin(){
        const serverSpinner = require('cli-spinners');
        const frames = serverSpinner.dots.frames;
        let i = 0;
        setInterval(() => {
            
            process.stdout.write(`\r${frames[i = ++i % frames.length]} Server is running on port 5000 - ` + new Date().toLocaleTimeString() 
        
        );
        }, 100);
    }
}


// ********** SERVER **********

app.listen(5000, () => {
    //    spinner.spin();
        console.log(new serverSpinner().spin());
    });
    



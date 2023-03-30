const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());
require('dotenv').config()
API_KEY = process.env.VITE_APP_API_KEY





const axios = require('axios');


//# get player games and game data

app.get(`/api/steam/user/games/:steamId`, (req, res) => {
    const steamId = req.params.steamId;

    axios.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamId}&include_appinfo=1`)
    .then(response => {
        const data = response.data;
        if (data.response.games) {
            const games = data.response.games;
            res.send({ games });
            console.log(games);
        } else {
            res.status(404).send({ message: 'Games not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    });

});




// # GetPlayerAchievements (v0001)
// **Returns a list of achievements for this user by app id**
// Example URL: http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=440&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=76561197972495328

app.get(`/api/steam/achievements/:steamId`, (req, res) => {
    const steamId = req.params.steamId;

    axios.get(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=730&key=${API_KEY}&steamid=${steamId}`)
    
    .then(response => {
        const data = response.data;
        if (data.playerstats.success === 1) {
            const achievements = data.playerstats.achievements;
            res.send({ achievements });
            console.log(achievements);
        } else {
            res.status(404).send({ message: 'Achievements not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    });
});


// get steam level
// http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=<steamApiKey>&steamid=<steamID64>

app.get(`/api/steam/level/:steamId`, (req, res) => {
    const steamId = req.params.steamId;
    axios.get(`http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${API_KEY}&steamid=${steamId}`)
    .then(response => {
        const data = response.data;
        if (data.response.success === 1) {
            const level = data.response.player_level;
            res.send({ level });
            console.log(level);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    });
});
    




// # GetPlayerSummaries (v0002)
// **Returns a list of players and their information**


app.get('/api/steam/:username', (req, res) => {
    const username = req.params.username;


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
    



const express = require('express');
const axios = require('axios');

const router = express.Router();


router.get('/api/steam/:username', (req, res) => {
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


router.get('/api/steam/user/:steamId', (req, res) => {
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

module.exports = router;




const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:steamId', async (req, res) => {
  try {
    const { steamId } = req.params;
    const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`);
    const { data } = response.data.response;
    if (data.length === 0) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.send({ player: data[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
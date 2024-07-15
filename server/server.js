const express = require('express');
const app = express();
const cors = require("cors");
const axios = require('axios');
var port = 5000;


// ********** MIDDLEWARE **********
app.use(cors());
require('dotenv').config()
API_KEY = process.env.VITE_APP_API_KEY


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
            
            process.stdout.write(`\r${frames[i = ++i % frames.length]} Server is running on port ` + port + ` ` + new Date().toLocaleString() + `  ` + emoji.get('crystal_ball') + ` `
        );
        }, 100);
    }
}


// ********** SERVER **********

app.listen(port, () => {
    //    spinner.spin();
        console.log(new serverSpinner().spin());
    });
    



const express = require('express');
const app = express();

// get all users
app.get('/api', (req, res) => {
    res.json({'uses': ['Node.js', 'Express.js', 'React', 'Vite'] });

});


//handler for 404 - Resource Not Found
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!' + emoji.get('t-rex'));
});
//handler for 500 - Server Error
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!' + emoji.get('poop'));
});
const emoji = require('node-emoji');
// node emoji's link https://www.npmjs.com/package/node-emoji
// spinnerCLI link https://www.npmjs.com/package/cli-spinners
class serverSpinner {
    spin(){
        const serverSpinner = require('cli-spinners');
        const frames = serverSpinner.dots.frames;
        let i = 0;
        setInterval(() => {
            process.stdout.write(`\r${frames[i = ++i % frames.length]} Server is running on port 5000 - ` + new Date().toLocaleTimeString()+ ' ');
        }, 100);
    }
}
app.listen(5000, () => {
    //    spinner.spin();
        console.log(new serverSpinner().spin());
    });
    



const express = require('express');
const app = express();
const db = require('./mysql');
const queries = require('./queries');
const bodyParser = require('body-parser');
const cors = require("cors");
const port = process.env.PORT || 10240;

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Welcome to our server!')
})

app.listen(port, () => { console.log(`APPLICATION STARTED ON PORT ${port}`) });

app.use(cors());

// Account APIs
app.post('/account/login', (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        db.run(queries.Login(email, password),
            (message) => {
                let id = '';
                if (message.length > 0)
                    id = message[0].ID;

                if (id > 0) {
                    res.write(`Login was successful, UserId: ${id}`);
                    console.log(`Login was successful, UserId: ${id}`);
                }
                else {
                    res.write(`Login ecnountered error! Please specify valid EMAIL and PASSWORD`);
                    console.log('Login ecnountered error! Please specify valid EMAIL and PASSWORD. ');
                }

                res.end();
                return;
            },
            (error) => {
                res.write(`Login ecnountered an error! Please specify valid EMAIL and PASSWORD`);
                console.log('Login ecnountered an error! Please specify valid EMAIL and PASSWORD. ', error);
                res.end();
                return;
            });

    } catch (er) {
        res.send('Error: ' + er)
    }

});
app.post('/account/register', (req, res) => {

    try {
        let email = req.body.email;
        let password = req.body.password;

        db.run(queries.Register(email, password),
            (message) => {

                res.write(`Registration was successful`);
                console.log(`Registration was successful`);
                res.end();
                return;
            },
            (error) => {
                res.write(`Registration ecnountered an error! Please specify valid EMAIL and PASSWORD`);
                console.log('Registration ecnountered an error! Please specify valid EMAIL and PASSWORD. ', error);
                res.end();
                return;
            });
    } catch (er) {
        res.send('Error: ' + er)
    }
});

// Weather APIs
app.post('/weather/save', (req, res) => {
    try {
        let userId = req.body.userId;
        let sun = req.body.sun;
        let water = req.body.water;
        let progress = req.body.progress;

        db.run(queries.Save(userId, sun, water, progress),
            (message) => {

                res.write(`Weather information saved successfully.`);
                console.log(`Weather information saved successfully.`);
                res.end();
                return;
            },
            (error) => {
                res.write(`Error saving weather information`);
                console.log('Error saving weather information. ', error);
                res.end();
                return;
            });
    } catch (er) {
        res.send('Error: ' + er)
    }
});
app.get('/weather/fetch', (req, res) => {
    try {
        let userId = req.query['user'];

        db.run(queries.Fetch(userId),
            (message) => {

                res.send(message);
                console.log(`Weather information read successfully.`);
                return;
            },
            (error) => {
                res.write(`Error saving weather information`);
                console.log('Error saving weather information. ', error);
                res.end();
                return;
            });
    } catch (er) {
        res.send('Error: ' + er)
    }
});

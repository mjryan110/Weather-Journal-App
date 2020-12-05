// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('Weather Journal App'));

const port = 8000;

// Spin up the server
const server = app.listen(port, listening);
    function listening() {
        //console.log(server);
        console.log(`running on localhost: ${port}`);
    }
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', sendData);

function sendData(request, response) {
    response.send(projectData);
}

//Post Route 2
app.post('/addData', function(req, res) {
    let data = req.body;
    console.log(data);

    // Create new entry for JS Object Endpoint
    projectData["temp"] = data.temp;
    projectData["feels_like"] = data.feels_like;
    projectData["date"] = data.date;
    projectData["city_name"] = data.city_name;

    //Send response to endpoint
    res.send(projectData);

    console.log('projectData ', projectData);
})

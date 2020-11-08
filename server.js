// Setup empty JS object to act as endpoint for all routes
projectData = [];

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

// Post Route
/*const data = []
app.post('/addData', addData);

function addData(req, res) {
    data.push(req.body)
    console.log(data)
}*/
//Post Route 2
app.post('/addData', function(req, res) {
    try{
        const data = {
            temperature: req.body.temperature,
            date: req.body.date,
            user_response: req.body.user_response,
        }
        projectData.push(data)
        console.log(data)
    }catch(error) {
        console.log("error: ",error)
    }
})

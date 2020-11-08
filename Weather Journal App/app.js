// Personal API Key for OpenWeatherMap API
const apiKey = "f3cf62c5df90459a77a1e98152c3cfe8"
const baseURL = "api.openweathermap.org/data/2.5/weather?"

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
document.getElementById('generate').addEventListener('click', performAction);

/* Function to GET Web API Data*/
const retrieveData = async(url = '') => {
    const request = await fetch(url);
    try {
        const allData = await request.json()
        return allData
    }catch(error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
function performAction() {
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    let apiCall = `${baseURL}zip=${zipCode}&units=imperial&appid=${apiKey}`;

    retrieveData(apiCall)
    .then(function(data){
        postData('/addData', {temperature: data.main.temp});
    })
}


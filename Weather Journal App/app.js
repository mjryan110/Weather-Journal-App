// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=f3cf62c5df90459a77a1e98152c3cfe8&units=imperial"
const baseURL = "api.openweathermap.org/data/2.5/weather?zip="

let d = new Date();
let newDate = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    let zip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    
    retrieveData(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=f3cf62c5df90459a77a1e98152c3cfe8&units=imperial`)
    .then(function(data){
        console.log('data checkin ', data.main.temp)
        let temp = data.main.temp;
        postData('/addData', {temp: temp, date: newDate, user_response: feelings});
    })
    .then(function(){
        updateUI();
    })
}

/* Function to GET Web API Data*/
const retrieveData = async(baseURL, zip, key) => {
    const response = await fetch(baseURL+zip+key);
    try {
        const allData = await response.json()
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

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      console.log('req ', request)

      const allData = await request.json();

      console.log('allData ', allData)
      
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
      document.getElementById('content').innerHTML = allData.user_response;
     }catch(error){
      console.log("error", error);
    }
  }

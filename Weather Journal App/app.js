// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=f3cf62c5df90459a77a1e98152c3cfe8&units=imperial"
const baseURL = "api.openweathermap.org/data/2.5/weather?zip="

let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    let zip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    let units = "imperial";
    
    retrieveData(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=f3cf62c5df90459a77a1e98152c3cfe8&units=${units}`)
    .then(function(data){
        console.log('data checkin ', data.main.temp)
        let temp = data.main.temp;
        let temp_feeling = data.main.feels_like;
        let city = data.name;
        postData('/addData', {temp: temp, feels_like: temp_feeling, date: newDate, user_response: feelings, city_name: city});
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
      document.getElementById('feels_like').innerHTML = allData.feels_like + ' degrees';
      document.getElementById('content').innerHTML = allData.user_response;
      document.getElementById('city').innerHTML = allData.city_name;
     }catch(error){
      console.log("error", error);
    }
  }

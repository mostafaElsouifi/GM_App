const axios = require('axios');

async function fetchDataFromAPI(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

// Example usage:
const apiUrl = 'https://countriesnow.space/api/v0.1/countries'; // Replace with your API URL

const allData = [];
let obj = {};

fetchDataFromAPI(apiUrl)
    .then(data => {
        if (data) {
            //console.log('Data from API:', data.data);
            for(let i = 0 ; i < data.data.length; i++){
                let obj = {};
                obj.id = i;
                obj.country = data.data[i].country;
                obj.cities = data.data[i].cities;
                allData.push(obj);
            }
            console.log(allData)
            writeObjectToJsonFile(allData, 'countries.json');

        } else {
            console.log('No data received from API.');
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
    });


const fs = require('fs');


function writeObjectToJsonFile(objectData, filePath) {
    try {
        const jsonData = JSON.stringify(objectData, null, 2); // null and 2 are for formatting
        fs.writeFileSync(filePath, jsonData);
        console.log('Data written to file successfully.');
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}






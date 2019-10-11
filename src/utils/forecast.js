const request = require('request')
const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/1f9d8aec9157b8b6586955cf041339a6/' + lat + ',' + lon 
    

    request({url: url, json: true},(error, response)=>{
        if (error){
            callback('Unable to connect to location services', undefined)
        }
        else if(! response.body){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, {
                summary: response.body.daily.data[0].summary
            })
        }
    })
}

module.exports = {forecast: forecast}
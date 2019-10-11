const request = require('request')
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFodWxhbmFuZDkwIiwiYSI6ImNrMHcwdjJ3YTBpeDgzY29jbnd0cW54ZnIifQ.YhpjblBF3Sk2l0-p9lTJfg'
    console.log('url', url)

    request({url: url, json: true}, (error, response) =>{
        
        if (error){
            callback('Unable to connect to location services', undefined)
        }
        else if(! response.body.features){
            console.log()
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, {
                lon : response.body.features[0].center[0],
                lat : response.body.features[0].center[1],
                loc : response.body.features[0].place_name
            })
        }
    })
}


module.exports = {geoCode: geoCode}


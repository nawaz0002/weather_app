import axios from 'axios'
export default axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json'+ '?latlng=23.2599' + ',' + '77.4126' + '&key=' + 'AIzaSyCGz58PUpHNAzTEwuRjvMCMU7bKZFxaOCk',
    headers: {
        'Content-Type': 'application/json'
    }
})

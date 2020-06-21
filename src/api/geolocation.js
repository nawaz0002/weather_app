import axios from 'axios'
export default axios.create({
    baseURL: 'http://ip-api.com/json',
    headers: {
        'Content-Type': 'application/json'
    }
})
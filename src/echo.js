import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

let token = localStorage.getItem('user-token')

let options = {
    broadcaster: 'pusher',
    key: 'fead7de241cbe925cb14',
    cluster: 'eu',
    encrypted: true,
    forceTLS: true,
    authEndpoint: 'http://localhost:8000/broadcasting/auth',
    auth: {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': "application/json"
        }
    }
}


export default  new Echo(options)
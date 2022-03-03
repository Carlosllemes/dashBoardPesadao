import axios from "axios";

const api = axios.create({
    baseURL:'https://runrun.it/api/',
    timeout: 10000,
    headers: {
        'App-Key': 'a4229842b679e1db3bfd96005c5fbac6',
        'User-Token':'AHU1NfyqFEHuvouXQxY'
    }
})

export default api
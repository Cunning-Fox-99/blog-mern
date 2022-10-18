import axios from "axios";

const instance = axios.create({
    baseURL: 'https://blog-fox.herokuapp.com'
})

export default instance
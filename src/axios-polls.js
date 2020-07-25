import axios from 'axios';

// Updating API
// const myApiInstance = axios.create({
//     baseURL: 'https://pollsrender.herokuapp.com/'
// });

// Firebase Instance
const firebaseInstance = axios.create({
    baseURL: 'https://polls-app-3ce1c.firebaseio.com/'
});

export default firebaseInstance;
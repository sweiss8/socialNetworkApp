import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        // if it exists, apply it to every request.
        axios.defaults.headers.common['Authorization'] = token;

    } else { // If the token isnt there
        // Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {GET_ERRORS, SET_CURRENT_USER} from './types';

// Register User

// this.props.history.push('/dashboard') is how you can redirect from within a component. 

//to do it here:
    //1 go to component in question and import import {withRouter} from 'react-router-dom';
    //2 wrap last variable in export in withrouter like this: (withRouter(Register))
    //3 go to where registerUser is called and add a second parameter of this.props.history
    //4 add history as a second parameter in the reguster User const above
    //5 then add history.push('/location') to .then promise above
    //user data comes in through first var
export const registerUser = (userData, history) => dispatch => {
    // pass data to backend api
    axios.post('/api/users/register', userData)
    // redirect from the action to
    .then(res => history.push('/login'))
    .catch(err => 
        // redux thunc allows us to do this
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        );
};


// Login - Get user token
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
    .then(res => {
        // Save token to localStorage
        const { token } = res.data;
        // Set token to local storage
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header (function in utils folder)
        setAuthToken(token);
        //Decode token using jwt-decome npm package
        const decoded = jwt_decode(token);
        // User data, issued at date, and expiration of auth token is in decoded.
        
        // Set current user
        dispatch(setCurrentUser(decoded));

    })
    .catch(err =>   // redux thunc allows us to do this
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
    
}

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        //Once SET CURRENT USER is dispatched we need to catch it in authReducer
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

// Log user out

export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove Auth Header for future requests.
    setAuthToken(false);
    // Set current user to {} which will also set isAuthenticated to false
    dispatch(setCurrentUser({}));
}

import axios from 'axios';

import {   
    GET_ERRORS, 
    EVENT_LOADING,
    GET_EVENT,
    GET_EVENTS,
    ADD_EVENT,
    ADD_MATCH,
    GET_MATCH,
    GET_MATCHES,
    ADD_POINT

} from './types';

// Add Event
export const addEvent = (eventData, history) => dispatch => {
    axios
        .post(`/api/events`, eventData)
        .then(res => dispatch({
            type: ADD_EVENT,
            payload: res.data
        }))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

// GET Event
export const getEvent = (id) => dispatch => {
    dispatch(setEventLoading())
    axios
        .get(`/api/events/${id}`)
        .then(res =>
            dispatch({
                type: GET_EVENT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_EVENT,
                payload: null
            })
        );
}

// GET Events
export const getEvents = () => dispatch => {
    dispatch(setEventLoading())
    axios
        .get('/api/events')
        .then(res =>
            dispatch({
                type: GET_EVENTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_EVENTS,
                payload: null
            })
        );
}

// GET MATCHES
export const getMatches = () => dispatch => {
    // dispatch(setEventLoading())
    axios
        .get('/api/matches')
        .then(res =>
            dispatch({
                type: GET_MATCHES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_MATCHES,
                payload: null
            })
        );
}



// Add Match
export const addMatch = (eventId, matchData) => dispatch => {
    axios
        .post(`/api/matches/${eventId}`, matchData)
        .then(res =>
            dispatch({
                type: ADD_MATCH,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: null
            })
        );
}

// GET MATCH
export const getMatch = (id) => dispatch => {
    // dispatch(setEventLoading())
    axios
        .get(`/api/matches/${id}`)
        .then(res =>
            dispatch({
                type: GET_MATCH,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_MATCH,
                payload: null
            })
        );
}


// Add Point
export const addPoint = (matchId, pointData) => dispatch => {
    axios
        .post(`/api/matches/point/${matchId}`, pointData)
        .then(res =>
            dispatch({
                type: ADD_POINT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: null
            })
        );
}

// Set loading state

export const setEventLoading = () => {
    return {
        type: EVENT_LOADING
    }
}

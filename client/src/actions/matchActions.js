import axios from 'axios';

import {   
    MATCH_LOADING,
    GET_MATCH,
    GET_MATCHES,
    ADD_POINT,
    GET_ERRORS, 


} from './types';


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
        // .catch(err =>
        //     dispatch({
        //         type: GET_ERRORS,
        //         payload: err.response.data
        //     })
        // );
}

// Set loading state

export const setMatchLoading = () => {
    return {
        type: MATCH_LOADING
    }
}

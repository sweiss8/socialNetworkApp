import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES } from '../actions/types';


const initialState = {
    profile: null,
    profiles: null,
    loading: false
}


// When getCurrentProfile (in profileAction.js) hits the api endpoint it passes along the data of the profile as a payload. Then the profile key below gets filled. If there is no profile, the payload will be empty and it will load a different dashboard. 

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

import { ADD_EVENT, GET_EVENT, GET_EVENTS, EVENT_LOADING, ADD_MATCH, GET_MATCH, ADD_POINT, GET_MATCHES } from '../actions/types';

const initialState = {
    events: [],
    event: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case EVENT_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading: false
            }
        case ADD_EVENT:
            return {
                ...state,
                events: [action.payload, ...state.events]
            }
        case ADD_MATCH:
            return {
                ...state,
                matches: [action.payload, ...state.matches]
            }
        case GET_MATCH:
            return {
                ...state,
                singleMatch: action.payload,
                loading: false
            }
        case GET_MATCHES:
            return {
                ...state,
                event: {
                    matches: [action.payload]
                }
            }
        case ADD_POINT:
            return {
                ...state,
                points: [action.payload, ...state.points]
            }
        case GET_EVENT:
            return {
                ...state,
                // The post is passed in as a payload which is the response from our back end.
                event: action.payload,
                loading: false
            }
        // case DELETE_POST:
        //     return {
        //         ...state,
        //         posts: state.posts.filter(post => post._id !== action.payload)
        //     }
        default:
            return state;
    }
}
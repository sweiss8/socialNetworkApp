
import { MATCH_LOADING, GET_MATCH, ADD_POINT, GET_MATCHES } from '../actions/types';

const initialState = {
    matches: [],
    singleMatch: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MATCH_LOADING:
            return {
                ...state,
                loading: true
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
                matches: action.payload

            }
        case ADD_POINT:
            return {
                ...state,
                points: [action.payload, ...state.points]
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
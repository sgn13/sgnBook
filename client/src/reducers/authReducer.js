import { GET_USERS, SET_CURRENT_USER } from '../actions/types'
import isEmpty from '../validation/is_empty'

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return action.payload;

        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }

        default:
            return state;
            break;

    }
}
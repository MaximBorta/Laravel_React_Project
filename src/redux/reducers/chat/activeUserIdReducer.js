import * as ActionTypes from '../../types/actionTypes'


export const activeUserIdReducer = (state = 0, action) => {
    switch (action.type) {
        case ActionTypes.SET_ACTIVE_USER_ID:
            return action.payload
        default:
            return state
    }
}
import * as ActionTypes from '../../types/actionTypes'


export const messageReducer = (state = '', action) => {
    switch (action.type) {
        case ActionTypes.SET_MESSAGE:
            return action.payload
        default:
            return state
    }
}
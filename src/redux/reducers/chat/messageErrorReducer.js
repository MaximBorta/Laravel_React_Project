import * as ActionTypes from '../../types/actionTypes'


export const messageErrorReducer = (state = '', action) => {
    switch (action.type) {
        case ActionTypes.SEND_MESSAGE_TO_ERROR:
            return action.error.response
        default:
            return state
    }
}
import * as ActionTypes from '../../types/actionTypes'


export const lastMessagesReducer = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_LAST_MESSAGES:
            return action.payload
        case ActionTypes.FETCH_LAST_MESSAGE_WITH:
            let newState = {
                ...state
            }
            newState[action.payload.id] = action.payload.message
            return newState
        default:
            return state
    }
}
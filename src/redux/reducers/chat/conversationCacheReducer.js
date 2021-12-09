import * as ActionTypes from '../../types/actionTypes'


export const conversationCacheReducer = ( state = {}, action) => {
    switch (action.type) {
        case ActionTypes.CACHE_CONVERSATION_WITH:
            let newState = {
                ...state
            }
             newState[action.payload.id] = action.payload.conversation
            return newState
        default:
            return state
    }
}
import * as ActionTypes from '../../types/actionTypes'


export const conversationReducer = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CONVERSATION_WITH:
            return action.payload
        case ActionTypes.ADD_LOCAL_MSG_TO_CONVERSATION:
            state.push({body: action.payload})
            return state
        default:
            return state
    }
}
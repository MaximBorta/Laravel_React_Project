import * as ActionTypes from '../../types/actionTypes'


const initialState = {
    activeUserId: 0
}

export const activeUserIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_ACTIVE_USER_ID:
            return {
                ...state,
                activeUserId: action.payload
            }
        default:
            return state
    }
}
import * as ActionTypes from "../types/actionTypes";

let initialState = {
    isOnline: null
}

export const onlineUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ONLINE_USERS:
            return {
                ...state,
                isOnline: true
            }
        case ActionTypes.OFFLINE_USERS:
            return {
                ...state,
                isOnline: false
            }
        default:
            return state
    }
}
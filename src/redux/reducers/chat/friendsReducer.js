import * as ActionTypes from '../../types/actionTypes'

const initialState = {
    friends: [],
    isFetching: false
}

export const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.IS_FETCHING_FRIENDS:
            return {
                ...state,
                isFetching: true
            }
        case ActionTypes.FETCH_FRIENDS:
            return {
                ...state,
                friends: action.payload,
                isFetching: false
            }
        default:
            return state
    }
}
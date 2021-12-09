import * as ActionTypes from '../types/actionTypes'

let initialState = {
    userProfile: '',
    isProfileLoading: false
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.LOADING:
            return {
                ...state,
                isProfileLoading: true
            }
        case ActionTypes.LOAD_PROFILE_SUCCESS:
            return {
                ...state,
                userProfile: action.payload,
                isProfileLoading: false
            }
        case ActionTypes.LOAD_PROFILE_ERROR:
            return {
                ...state,
                userProfile: action.payload,
                isProfileLoading: false
            }
        case ActionTypes.CODE_ERROR:
            return {
                ...state,
                userProfile:
                    "There seems to be a problem, please refresh your browser :)",
                isProfileLoading: false
            }

        default:
            return state
    }
}
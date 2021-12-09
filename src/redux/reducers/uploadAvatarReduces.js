import * as ActionTypes from '../types/actionTypes'


let initialState = {
    responseToUpload: '',
    isUploading: false
}

export const uploadAvatarReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPLOAD_LOADING:
            return {
                ...state,
                isUploading: true
            }
        case ActionTypes.UPLOAD_PROFILE_SUCCESS:
            return {
                ...state,
                responseToUpload: action.payload,
                isUploading: false
            }
        case ActionTypes.UPLOAD_PROFILE_ERROR:
            return {
                ...state,
                responseToUpload: action.error,
                isUploading: false
            }
        default:
            return state
    }
}
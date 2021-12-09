import * as ActionTypes from "../types/actionTypes";


let initialState = {
    isEditing: false,
    editedResponse: '',
}

export const editProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.EDIT_LOADING:
            return {
                ...state,
                isEditing: true
            }
        case ActionTypes.EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                isEditing: false,
                editedResponse: action.payload
            }
        case ActionTypes.EDIT_PROFILE_ERROR:
            return {
                ...state,
                isEditing: false,
                editedResponse: action.error.response.data
            }
        default:
            return state
    }
}
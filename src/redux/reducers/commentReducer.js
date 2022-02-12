import * as ActionTypes from '../types/actionTypes'

const initialState = {
    fetchPostComments: {},
    comments: [],
    isFetching: false,
    isSending: false,
    successResponse: null,
}

export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.IS_FETCHING_COMMENT:
            return {
                ...state,
                isFetching: true
            }
        case ActionTypes.FETCH_COMMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                fetchPostComments: action.payload,
                comments: action.payload.comments
            }
        case ActionTypes.IS_CREATING_COMMENT:
            return {
                ...state,
                isSending: true
            }
        case ActionTypes.COMMENT_CREATED:
            return {
                ...state,
                isSending: false,
                successResponse: action.payload
            }
        default:
            return state
    }
}
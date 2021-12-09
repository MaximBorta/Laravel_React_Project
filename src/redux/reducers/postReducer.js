import * as ActionTypes from '../types/actionTypes'


const initialState = {
    isLoading: false,
    isDestroying: false,
    postResponse: '',
    createPostResponse: '',
    updatePostResponse: '',
    deletedPostResponse: '',
    responseError: '',
    showPost: ''
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.IS_LOADING_POSTS:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.LOADING_POSTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                postResponse: action.payload
            }
        case ActionTypes.LOADING_POSTS_ERROR:
            return {
                ...state,
                isLoading: false,
                postResponse: action.error
            }
        case ActionTypes.SHOW_POSTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showPost: action.payload
            }
        case ActionTypes.SHOW_POSTS_ERROR:
            return {
                ...state,
                isLoading: false,
                showPost: action.error
            }
        case ActionTypes.IS_CREATING_POST:
            return  {
                ...state,
                isLoading: true,
            }
        case ActionTypes.CREATE_POST_SUCCESS:
            return  {
                ...state,
                isLoading: false,
                createPostResponse: action.payload
            }
        case ActionTypes.CREATE_POST_ERROR:
            return  {
                ...state,
                isLoading: false,
                responseError: action.error.response
            }
        case ActionTypes.IS_UPDATING_POST:
            return  {
                ...state,
                isLoading: true,
            }
        case ActionTypes.UPDATE_POST_SUCCESS:
            return  {
                ...state,
                isLoading: false,
                updatePostResponse: action.payload
            }
        case ActionTypes.UPDATE_POST_ERROR:
            return  {
                ...state,
                isLoading: false,
                responseError: action.error.response
            }
        case ActionTypes.IS_DELETING_POST:
            return {
                ...state,
                isLoading: true,
            }
        case ActionTypes.DELETING_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deletedPostResponse: action.payload
            }
        default:
            return state
    }
}
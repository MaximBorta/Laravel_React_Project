import * as ActionTypes from '../types/actionTypes'


let initialState = {
    isLoading: false,
    isEditing: false,
    response: [],
    editedResponse: {},
    getCards: [],
    showCard: {}
}

export const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_HOME_HEADER:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.LOAD_HOME_HEADER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.payload
            }
        case ActionTypes.LOAD_HOME_HEADER_ERROR:
            return {
                ...state,
                isLoading: false,
                response: action.error
            }
        case ActionTypes.LOAD_HOME_CARDS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getCards: action.payload
            }
        case ActionTypes.LOAD_HOME_CARDS_ERROR:
            return {
                ...state,
                isLoading: false,
                getCards: action.error
            }
        case ActionTypes.LOAD_HOME_CARD:
            return {
                ...state,
                isLoading: true,
            }
        case ActionTypes.SHOW_HOME_CARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showCard: action.payload
            }
        case ActionTypes.SHOW_HOME_CARD_ERROR:
            return {
                ...state,
                isLoading: false,
                showCard: action.error
            }
        case ActionTypes.IS_EDIT_CARD:
            return {
                ...state,
                isEditing: true
            }
        case ActionTypes.EDIT_CARD_SUCCESS:
            return {
                ...state,
                isEditing: false,
                editedResponse: action.payload
            }
        case ActionTypes.EDIT_CARD_ERROR:
            return {
                ...state,
                isEditing: false,
                editedResponse: action.error.response
            }
        default:
            return state
    }
}
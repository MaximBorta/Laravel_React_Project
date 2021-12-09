import * as ActionTypes from "../../types/actionTypes";
import axios from 'axios'

const token = localStorage.getItem('user-token')
const options = {
    headers: {
        'Authorization': 'Bearer ' + token
    }
}

const BASE_URL = 'http://localhost:8000/api/users'


export const fetchConversationWith = (id, force = false) => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        debugger
        let cached = getState().conversationCache[id]
        let lastMessage = getState().lastMessages[id]

        if (!force && cached && (!lastMessage || cached[cached.length - 1].id === lastMessage.id)) {
            dispatch({
                type: ActionTypes.FETCH_CONVERSATION_WITH,
                payload: cached
            })
            resolve()
            return
        }
        axios.get(`${BASE_URL}/conversation/${id}`, options).then(res => {
            if (getState().activeUserId !== id) return
            dispatch({
                type: ActionTypes.FETCH_CONVERSATION_WITH,
                payload: res.data
            })
            dispatch({
                type: ActionTypes.FETCH_LAST_MESSAGE_WITH,
                payload: {
                    id: id,
                    message: res.data[res.data.length - 1]
                }
            })
            resolve()
        })
    })

export const fetchLastMessageWith = (id) => async (dispatch) =>
    new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/conversation/last/${id}`, options).then(res => {
            debugger
            dispatch({
                type: ActionTypes.FETCH_LAST_MESSAGE_WITH,
                payload: {
                    id: id,
                    message: res.data
                }
            })
            resolve()
        })
    })

export const fetchLastMessages = () => async (dispatch) =>
    new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/conversation/last`, options).then(res => {
            dispatch({
                type: ActionTypes.FETCH_LAST_MESSAGES,
                payload: res.data
            })
        })
    })

export const addLocalMsgToConversation = (message) => (dispatch) =>
    new Promise((resolve, reject) => {
        dispatch({
            type: ActionTypes.ADD_LOCAL_MSG_TO_CONVERSATION,
            payload: message
        })
        return resolve()
    })

export const setActiveUserId = (id) => (dispatch, getState) => {
    let conversation = getState().conversation
    let currentId = getState().activeUserId

    if (conversation.length && (conversation[conversation.length - 1].sender_id === currentId ||
        conversation[conversation.length -1].recipient_id === currentId))
        dispatch({
            type: ActionTypes.CACHE_CONVERSATION_WITH,
            payload: {
                id: currentId,
                conversation
            }
        })
        dispatch({
            type: ActionTypes.SET_ACTIVE_USER_ID,
            payload: id
        })
    return Promise.resolve()
}



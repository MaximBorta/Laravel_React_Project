import HttpService from "../../services/HttpService";
import * as ActionTypes from '../types/actionTypes'
import axios from 'axios'

let http =new HttpService()

export const getHomeHeaderAction = () => (dispatch) => {
    let token = localStorage.getItem('user-token')
        dispatch({type: ActionTypes.LOAD_HOME_HEADER})
    http.getData('main/home-header', token).then( res => {
        dispatch({type: ActionTypes.LOAD_HOME_HEADER_SUCCESS, payload: res.data})
    }).catch( error => {
        dispatch({type: ActionTypes.LOAD_HOME_HEADER_ERROR, error})
    })
}

export const getHomeCardAction = () => (dispatch) => {
    http.getData('main/home-cards').then(res => {
        dispatch({type: ActionTypes.LOAD_HOME_CARDS_SUCCESS, payload: res.data})
    }).catch(error => {
        dispatch({type: ActionTypes.LOAD_HOME_CARDS_ERROR, error})
    })
}

export const showHomeCardAction = (id) => async (dispatch) => {
        dispatch({type: ActionTypes.LOAD_HOME_CARD})
    await http.getData(`main/home-cards/${id}`).then( res => {
        dispatch({type: ActionTypes.SHOW_HOME_CARD_SUCCESS, payload: res.data})
    }).catch(error => {
        dispatch({type: ActionTypes.SHOW_HOME_CARD_ERROR, error})
    })
}

export const editCardAction = (id, formData) => async (dispatch) => {
        dispatch({type: ActionTypes.IS_EDIT_CARD})
    await axios.put(`http://localhost:8000/api/main/home-cards/${id}/update`, formData, {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    }).then( res => {
        dispatch({type: ActionTypes.EDIT_CARD_SUCCESS, payload: res.data})
    }).catch(error => {
        dispatch({type: ActionTypes.EDIT_CARD_ERROR, error})
    })
}
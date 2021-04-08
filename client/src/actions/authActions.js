import { GET_ERRORS, GET_USERS, SET_CURRENT_USER } from './types'
import axios from 'axios'
import { setAuthToken } from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import store from '../store'
import decoded from 'jwt-decode'
import { message } from 'antd'

//REGISTER USER
export const registerUser = (userData, history) => async dispatch => {
    try {
        const data = await axios.post(`http://localhost:5000/api/users/register`, userData)
        if (data) {
            message.success("Successfully registered")
        }
        dispatch({
            type: GET_USERS,
            payload: data.data.user
        })

        history.push('/login')

    }
    catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

//LOGIN USER

export const loginUser = (userData) => async dispatch => {

    try {

        const data = await axios.post(`http://localhost:5000/api/users/login`, userData)
        if (data) {
            message.success("You're logged in ")
        }
        const { token } = data.data;
        localStorage.setItem('token', token)
        setAuthToken(token);
        const decoded = jwt_decode(token)
        dispatch(setCurrentUser(decoded))

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

//set logged in user

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Set loggout 

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('token')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
    //redirect to login
    history.push('/login')

    //check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        //Logout user
        store.dispatch(logoutUser());
        //clear current profile

    }

}
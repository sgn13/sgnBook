import axios from 'axios'
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER, GET_PROFILES } from './types'

//get current profile

export const getCurrentProfile = () => async dispatch => {
    dispatch(setProfileLoading());
    try {
        const data = await axios.get(`http://localhost:5000/api/profile`)
        dispatch({
            type: GET_PROFILE,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    }
}

//get current profile

export const getAllProfiles = () => async dispatch => {
    dispatch(setProfileLoading());
    try {
        const data = await axios.get(`http://localhost:5000/api/profile/all`)
        dispatch({
            type: GET_PROFILES,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: GET_PROFILES,
            payload: null
        })
    }
}


//get current profile

export const setCurrentProfile = (cData, history) => async dispatch => {
    try {
        const data = await axios.post(`http://localhost:5000/api/profile/postProfile`, cData)

        if (data) {
            history.push('/dashboard')
        }

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }
}


//get profile handle

export const getProfileByHandle = (handle) => async dispatch => {
    dispatch(setProfileLoading());
    try {
        const data = await axios.get(`http://localhost:5000/api/profile/handle/${handle}`)
        if (data) {
            dispatch({
                type: GET_PROFILE,
                payload: data.data
            })
        }
    } catch (error) {
        dispatch({
            type: GET_PROFILE,
            payload: null
        })
    }
}
//add experience 

export const addExperience = (expData, history) => async dispatch => {
    try {
        const data = await axios.post(`http://localhost:5000/api/profile/experience`, expData)
        if (data) {
            history.push('/dashboard')
        }

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }
}

//delete experience 

export const deleteExperience = (id) => async dispatch => {
    try {
        const data = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`)
        dispatch({
            type: GET_PROFILE,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }
}

//add education 

export const addEducation = (eduData, history) => async dispatch => {
    try {
        const data = await axios.post(`http://localhost:5000/api/profile/education`, eduData)
        if (data) {
            history.push('/dashboard')
        }

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }
}

//delete education 

export const deleteEducation = (id) => async dispatch => {
    try {
        const data = await axios.delete(`http://localhost:5000/api/profile/education/${id}`)
        dispatch({
            type: GET_PROFILE,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }
}

//delete profile

export const deleteAccount = () => async dispatch => {
    try {
        if (window.confirm('Are you sure? This cannot be undone')) {
            const data = await axios.delete(`http://localhost:5000/api/profile/`)
            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            })

        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    }
}

//profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING,
        payload: {}
    }
}

// clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE,
    }
}
import axios from 'axios'
import { POST_LOADING, ADD_POST, GET_POST, DELETE_POST, GET_POSTS, GET_ERRORS, CLEAR_ERRORS } from './types'

export const addPost = postData => async dispatch => {
    dispatch(clearErrors())
    try {
        const data = await axios.post(`http://localhost:5000/api/posts`, postData)

        if (data) {
            console.log("successfull");

            dispatch({
                type: ADD_POST,
                payload: data.data
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getPosts = () => async dispatch => {
    dispatch(setPostLoading())
    try {
        const data = await axios.get(`http://localhost:5000/api/posts`)

        if (data) {
            dispatch({
                type: GET_POSTS,
                payload: data.data
            })
        }
    } catch (error) {
        dispatch({
            type: GET_POSTS,
            payload: null
        })
    }
}

//single post
export const getPost = (id) => async dispatch => {
    dispatch(setPostLoading())
    try {
        const data = await axios.get(`http://localhost:5000/api/posts/${id}`)

        if (data) {
            dispatch({
                type: GET_POST,
                payload: data.data
            })
        }
    } catch (error) {
        dispatch({
            type: GET_POST,
            payload: null
        })
    }
}

//delete post 
export const deletePost = id => async dispatch => {
    try {
        const data = await axios.delete(`http://localhost:5000/api/posts/${id}`)
        if (data) {
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

//add like 
export const addLike = id => async dispatch => {
    try {
        const data = await axios.post(`http://localhost:5000/api/posts/like/${id}`)
        if (data) {
            dispatch(getPosts())
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

//add comment 
export const addComment = (postId, commentData) => async dispatch => {
    dispatch(clearErrors())
    try {
        const data = await axios.post(`http://localhost:5000/api/posts/comment/${postId}`, commentData)
        if (data) {
            dispatch({
                type: GET_POST,
                payload: data.data
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

//delete comment 
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const data = await axios.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`)
        if (data) {
            dispatch({
                type: GET_POST,
                payload: data.data
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}


//unlike post 
export const removeLike = id => async dispatch => {
    try {
        const data = await axios.post(`http://localhost:5000/api/posts/unlike/${id}`)
        if (data) {
            dispatch(getPosts())
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}


//profile loading
export const setPostLoading = () => {
    return {
        type: POST_LOADING,
        payload: {}
    }
}

//clear errors

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}
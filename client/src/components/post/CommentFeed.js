import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem'

const CommentFeed = (props) => {
    const { comments, postId } = props
    return comments.map((comment) => <CommentItem key={comment._id} comment={comment} postId={postId} />)
}
CommentFeed.protoTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
}

export default CommentFeed

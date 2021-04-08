import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPost } from '../../actions/postActions'
import Loading from '../Home/Loading'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'

const Post = (props) => {
    const { post, loading } = props.post
    useEffect(() => {
        props.getPost(props.match.params.id)
    }, [])

    let postContent

    if (post === null || loading || Object.keys(post).length === 0) {
        postContent = <Loading />
    }
    else {
        postContent =
            <>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <CommentFeed postId={post._id} comments={post.comments} />
            </>
    }
    return (
        <div>
            <Link to="/feed">
                Back to feed
            </Link>
            {postContent}
        </div>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)


import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getPosts } from '../../actions/postActions'
import PostForm from './PostForm'
import Loading from '../Home/Loading'
import PostFeed from './PostFeed'
import { Col, Row } from 'antd'
import Sidebar from '../sidebar/Sidebar'


const Posts = (props) => {
    const { posts, loading } = props.post

    useEffect(() => {
        props.getPosts()
    }, [])
    let postContent

    if (posts === null || loading) {
        postContent = <Loading />
    }
    else {
        if (Object.keys(posts).length > 0) {
            postContent =
                <>
                    <PostFeed posts={posts} />
                </>
        } else {
            postContent =
                <>
                    <p>You have no post</p>
                </>
        }
    }

    return (
        <div>
            <Row>
                <Col span={4}>
                    <Sidebar />
                </Col>
                <Col span={16}>
                    <PostForm />
                    {postContent}
                </Col>
            </Row>
        </div>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post,
})


export default connect(mapStateToProps, { getPosts })(Posts)


import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, addLike, removeLike } from '../../actions/postActions'
import { LikeOutlined, DislikeOutlined, LikeFilled, CommentOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Card, Col, Row, Popover } from 'antd'

const PostItem = (props) => {
    const { post, auth, showActions } = props
    console.log(props);

    const [hide, setHide] = useState(false)

    const handleDeleteClick = (id) => {
        if (window.confirm("Do you sure wanna delete your post?")) {
            props.deletePost(id)
        }
    }

    const handleLikePost = (id) => {
        props.addLike(id)
    }

    const handleUnlikePost = (id) => {
        props.removeLike(id)
    }

    const findUserLike = (likes) => {
        const { auth } = props
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return (true);
        }
        else {
            return (false);
        }
    }
    const handleVisibleChange = (visible) => {
        setHide(visible)

    }

    return (
        <div>
            <Col span={12} offset={6}>
                <Card style={{ border: '1px solid #4444', margin: '50px 0' }}>
                    <Row style={{ marginBottom: '1rem' }}>
                        <img src={post.avatar} width="40px" style={{ borderRadius: '50%', marginRight: '1rem' }} alt="" />
                        <strong>{post.name}</strong>
                        <Col offset={19}>
                            <Popover
                                placement="bottomRight"
                                content={post.user === auth.user.id ? (
                                    <button onClick={() => handleDeleteClick(post._id)}>Delete</button>
                                ) : null
                                }
                                trigger="click"
                                visible={hide}
                                onVisibleChange={handleVisibleChange}
                            >
                                <EllipsisOutlined />

                            </Popover>

                        </Col>
                    </Row>
                    <p>{post.text}</p>
                    <p style={{ fontSize: '10px' }}> <span>{post.likes.length} Likes</span> &nbsp;  &nbsp;<span>{post.comments.length} Comment</span></p>


                    {/* {findUserLike ? <LikeOutlined onClick={() => handleLikePost(post._id)} /> : <LikeFilled onClick={() => handleLikePost(post._id)} />} */}
                    {showActions ? (<span>
                        <LikeOutlined onClick={() => handleLikePost(post._id)} /><span style={{ color: 'grey' }}>Like</span>  &nbsp;
                        <DislikeOutlined onClick={() => handleUnlikePost(post._id)} /> <span style={{ color: 'grey' }}>Dislike</span>  &nbsp;
                        <Link to={`/post/${post._id}`} style={{ color: 'grey' }}><CommentOutlined /> Comments</Link>

                    </span>) : null}
                </Card>
            </Col>
        </div >
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem)


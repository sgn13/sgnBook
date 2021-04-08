import React from 'react'
import { deleteComment } from '../../actions/postActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Card, Row } from 'antd'

const CommentItem = (props) => {
    const { comment, postId, auth } = props

    const handleDeleteClick = (postId, commentId) => {
        props.deleteComment(postId, commentId)
    }

    return (
        <div>
            <Col span={12} offset={6}>
                <Card style={{ border: '1px solid #4444', margin: '50px 0' }}>
                    <Row style={{ marginBottom: '1rem' }}>

                        <img src={comment.avatar} width="40px" style={{ borderRadius: '50%', marginRight: '1rem' }} alt="" />
                        <strong>{comment.name}</strong>
                    </Row>
                    <p>{comment.text}</p>

                    {comment.user === auth.user.id ? (
                        <button onClick={() => handleDeleteClick(postId, comment._id)}>Delete</button>
                    ) : null
                    }
                </Card>
            </Col>
        </div>
    )
}
CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)


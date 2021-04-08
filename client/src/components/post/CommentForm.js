import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Input, DatePicker, Switch, Button } from 'antd'
import { addComment } from '../../actions/postActions'
import { LikeOutlined, DislikeOutlined, LikeFilled } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'

const CommentForm = (props) => {
    const [form] = Form.useForm();
    const { user } = props.auth
    const { postId } = props

    const tailLayout = {
        labelCol: { span: 6 },
        wrapperCol: { offset: 6, span: 12 },
    }

    const onFinish = (values) => {
        values = { ...values, name: user.name, avatar: user.avatar }
        props.addComment(postId, values)
        form.resetFields();
    }

    return (
        <div>
            <Form
                form={form}
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 12,
                }}
                layout="horizontal"
                onFinish={onFinish}
            >
                <Form.Item label="Comment" name="text">
                    <TextArea
                        name="text"
                        placeholder="Write a comment..."
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" danger htmlType="submit">Comment</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

CommentForm.propTypes = {

    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { addComment })(CommentForm)
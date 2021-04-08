import React from 'react'
import { Form, Input, DatePicker, Switch, Button } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/postActions'

const PostForm = (props) => {
    const { user } = props.auth
    const [form] = Form.useForm()

    const tailLayout = {
        labelCol: { span: 6 },
        wrapperCol: { offset: 6, span: 12 },
    }

    const onFinish = (values) => {
        values = { ...values, name: user.name, avatar: user.avatar }
        props.addPost(values)
        form.resetFields()
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

                <Form.Item label="Post" name="text">
                    <TextArea
                        name="text"
                        placeholder="Write something"
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" danger htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>

        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post,
})


export default connect(mapStateToProps, { addPost })(PostForm)

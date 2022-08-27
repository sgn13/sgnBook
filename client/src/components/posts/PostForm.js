import React, { useState } from 'react'
import { Form, Input, DatePicker, Switch, Button, Upload, message } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/postActions'
import { UploadOutlined } from '@ant-design/icons'

const PostForm = (props) => {
    const { user } = props.auth
    const [image, setImage] = useState("");
    const [form] = Form.useForm()


    const tailLayout = {
        labelCol: { span: 6 },
        wrapperCol: { offset: 6, span: 12 },
    }

    const onFinish = (values) => {
        var formData = new FormData()
        formData.append("text", values.text)
        formData.append("photo", image)
        formData.append("name", user.name)
        formData.append("avatar", user.avatar)

        // values = { ...formData, name: user.name, avatar: user.avatar }
        props.addPost(formData)
        form.resetFields()
    }

    const propsData = {
        name: "file",
        progress: {
            strokeColor: {
                "0%": "#108ee9",
                "100%": "#87d068",
            },
            strokeWidth: 3,
            format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

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
                        rows="4" cols="50"
                    />

                </Form.Item>

                <Form.Item
                    name="photo"
                    fileList={image}
                    onChange={handleFileChange}
                    beforeUpload={() => false}
                    maxCount="1"
                    {...tailLayout}
                >
                    <Upload {...propsData}>
                        <Button icon={<UploadOutlined />}>Upload photo</Button>
                    </Upload>

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

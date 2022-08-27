import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Form, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions'

const UpdateMeForm = (props) => {
    const { name, avatar, email } = props.auth.user
    const [image, setImage] = useState("");

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            name,
            email,
            avatar
        });
    }, []);
    const onFinish = (values) => {
        var formData = new FormData()

        formData.append("name", values.name)
        formData.append("email", values.email)
        formData.append("avatar", image)
        props.updateUser(formData)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };


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
    const configureAvatarImage = (image) => {
        // const id = this.props.payload._id;
        return `http://localhost:5000/staticUser/` + image;
    };


    return (
        <div>
            <h3 className="text-center">YOUR ACCOUNT SETTINGS</h3>
            <Form
                form={form}
                labelCol={{
                    offset: 6,
                    span: 6,
                }}
                wrapperCol={{
                    offset: 6,
                    span: 12,
                }}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="name"
                >
                    <Input
                        name="name"
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input
                        name="email"
                    />
                </Form.Item>
                <Form.Item
                    name="photo"
                    fileList={image}
                    onChange={handleFileChange}
                    beforeUpload={() => false}
                    maxCount="1"
                >
                    <Upload {...propsData}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span>
                                <img src={configureAvatarImage(avatar)} alt="" width="100px" style={{ borderRadius: '50%', height: '110px', marginRight: '0.75rem' }} />
                            </span>
                            <Button icon={<UploadOutlined />}>Choose a photo</Button>
                        </div>
                    </Upload>

                </Form.Item>

                <Form.Item wrapperCol={{
                    offset: 14,
                    span: 12,
                }}>
                    <Button type="primary" danger htmlType="submit">Update Settings</Button>
                </Form.Item>
            </Form>
        </div >
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { updateUser })(UpdateMeForm)


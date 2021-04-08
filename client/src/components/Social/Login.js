import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Col, Row, message } from 'antd';
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import { useHistory } from "react-router-dom";
import PropTypes, { object } from 'prop-types'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = (props) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    let history = useHistory();
    // const [error, setError] = useState()
    const [form] = Form.useForm();


    // const check = Object.keys(error).length
    // console.log(check);
    // if (check === 0) {
    //     console.log(" i am not error");
    // }

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            history.push("/dashboard");
        }
    }, [props.auth.isAuthenticated])

    const onFinish = (values) => {
        props.loginUser(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo, "error failed");
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <Col span={6} >
                <Form
                    // {...layout}
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item label="Email" style={{ marginBottom: 0 }}>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email' },
                                { type: 'email', message: 'Invalid email' },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                name="email"
                                value={formData.email}
                                onChange={onChange}
                                placeholder="Email"
                            />

                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Password" style={{ marginBottom: 0 }}>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                name="password"
                                onChange={onChange}
                                placeholder="Password"
                            />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Submit
                        </Button>
                        <h1>{props.errors.email}</h1>
                        <h1>{props.auth.user?.name}</h1>
                    </Form.Item>
                </Form>
            </Col>
        </Row >
    )
}

Login.protoType = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)


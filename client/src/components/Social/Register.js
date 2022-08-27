import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { connect } from 'react-redux'
import { registerUser, logoutUser } from '../../actions/authActions'
import { withRouter, useHistory, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import book from '../../assets/book.jpg'
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Register = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''

    })
    const [error, setError] = useState('')
    const history = useHistory()
    const { user } = props.auth
    const { errors } = props

    const onFinish = async (values) => {

        props.registerUser(formData, props.history)

    };

    useEffect(() => {
        console.log(props.auth.isAuthenticated);
        if (props.auth.isAuthenticated) {
            history.push("/dashboard");
        }

    }, [props.auth.isAuthenticated])

    const onFinishFailed = (nextProps) => {
        if (nextProps) {
            setError(nextProps.errorFields);
        }
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Row justify="center" align="middle" style={{
                height: '100vh',
                backgroundImage: `linear-gradient(to bottom,rgba(105, 105, 105, 0.52), rgba(0, 0, 0, 0.73)),url(${book}) `,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                margin: '-100px'
            }}>

                <div className="rounded-2xl bg-gray-100 shadow-2xl py-8 px-6 m-2 lg:py-24 lg:px-12 border border-gray-200">
                    <h3 className="text-gray-500 text-center mb-4">Register</h3>

                    <Form
                        name="basic"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}

                    >
                        <p>{error.password2}</p>
                        <Row gutter={24}>
                            <Col span={12} >
                                <Form.Item
                                    label="Username"
                                >

                                    <Form.Item
                                        noStyle
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                    >
                                        <Input
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            placeholder="Username"
                                            name="name"
                                            onChange={onChange}
                                        />
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item
                                    label="Email"
                                >
                                    <Form.Item
                                        noStyle
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Please input your email' },
                                            { type: 'email', message: 'Invalid email' },
                                        ]}
                                    >
                                        <Input
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            placeholder="Email"
                                            name="email"
                                            onChange={onChange}
                                        />
                                    </Form.Item>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label="Password"
                        >
                            <Form.Item
                                noStyle
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    name="password"
                                    placeholder="Password"
                                    onChange={onChange}
                                />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                        >
                            <Form.Item
                                noStyle
                                name="password2"
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Confirm Password"
                                    name="password2"
                                    onChange={onChange}
                                />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Submit
          </Button>
                        </Form.Item>
                        <Link to="/login">Back to login </Link>

                    </Form>
                </div>

            </Row>
        </>
    )
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { registerUser, logoutUser })(withRouter(Register))

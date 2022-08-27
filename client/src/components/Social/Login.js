import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Col, Row } from 'antd';
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import { Link, useHistory } from "react-router-dom";
import PropTypes from 'prop-types'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import book from '../../assets/book.jpg'

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
            history.push("/");
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
        <Row justify="center" align="middle" style={{
            height: '100vh',
            backgroundImage: `linear-gradient(to bottom,rgba(105, 105, 105, 0.52), rgba(0, 0, 0, 0.73)),url(${book}) `,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            margin: '-100px'
        }}>
            <Col span={6} >
                {/* <h1 className="text-gray-200">SGNBOOK</h1> */}

                <div className="rounded-2xl bg-gray-100 shadow-2xl py-8 px-6 m-2 lg:py-24 lg:px-12 border border-gray-200">
                    <h3 className="text-gray-500 text-center mb-4">Login</h3>

                    <Form
                        // {...layout}
                        form={form}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout="vertical"
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item label="Email">
                            <Form.Item
                                noStyle
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your email' },
                                    { type: 'email', message: 'Invalid email' },
                                    // { validator: checkError }
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
                            {props.errors.email && <p style={{ color: "red", marginTop: "-1rem" }}>
                                * {props.errors.email}
                            </p>}

                        </Form.Item>

                        <Form.Item label="Password">
                            <Form.Item
                                noStyle
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
                            {props.errors.password && <p style={{ color: "red", marginTop: "-1rem" }}>
                                * {props.errors.password}
                            </p>}
                        </Form.Item>


                        <Form.Item >
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Submit
                        </Button>
                        </Form.Item>
                        <Link to="/register">Don't have an account ?</Link>
                    </Form>
                </div>
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


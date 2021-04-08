import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux'
import { registerUser, logoutUser } from '../../actions/authActions'
import { withRouter, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

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
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}

            >
                <p>{error.password2}</p>
                <Form.Item
                    label="Username"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        name="name"
                        onChange={onChange}
                    />
                </Form.Item>

                <Form.Item
                    label="email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                        name="email"
                        onChange={onChange}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        name="password"
                        onChange={onChange}
                    />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="password2"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        name="password2"
                        onChange={onChange}
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
          </Button>
                </Form.Item>
            </Form>
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

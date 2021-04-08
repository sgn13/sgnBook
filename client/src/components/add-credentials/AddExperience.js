import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addExperience } from '../../actions/profileActions'
import {
    Form,
    Input,
    Button,
    DatePicker,
    Switch,

} from 'antd';

const AddExperience = (props) => {
    const [data, setData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
    })
    const [error, setError] = useState()

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const onSelectChange = (value) => {
        setData({ ...data, status: value })
    }
    const tailLayout = {
        labelCol: { span: 6 },
        wrapperCol: { offset: 6, span: 12 },
    };

    const onFinish = async (values) => {

        // form.resetFields();
        values.current = values.current ? '' : false
        props.addExperience(values, props.history)
        console.log(values);

    };

    return (
        <div>
            <h1>Add Experience</h1>
            <Form
                // form={form}
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 12,
                }}
                layout="horizontal"
                onFinish={onFinish}

            >
                <Form.Item label="Company" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="company"
                        rules={[
                            {
                                required: true,
                                message: 'Please input company name!',
                            }]}
                    >
                        <Input
                            name="company"
                            // onChange={on Change}
                            placeholder="Company"
                            defaultValue={data.company}
                        />
                    </Form.Item>
                </Form.Item>

                <Form.Item label="Title" name="title">
                    <Input
                        name="title"
                        // onChange={onChange}
                        placeholder="Title"
                    />
                </Form.Item>

                <Form.Item label="From date" name="from">
                    <DatePicker
                        name="from"
                        // onChange={onChange}
                        placeholder="From date"
                    />
                </Form.Item>

                <Form.Item label="To date" name="to">
                    <DatePicker
                        name="to"
                        // onChange={onChange}
                        placeholder="To date"
                    />
                </Form.Item>

                <Form.Item label="Current job" name="current" valuePropName="checked">
                    <Switch
                        name="current"
                        // onChange={onChange}
                        placeholder="Current job"
                    />
                </Form.Item>

                <Form.Item label="Job Description" name="description">
                    <Input
                        name="description"
                        // onChange={onChange}
                        placeholder="Job Description"
                    />
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Button type="primary" danger htmlType="submit">Add</Button>
                </Form.Item>

            </Form>

        </div>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
})


export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience))

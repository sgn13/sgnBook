import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addEducation } from '../../actions/profileActions'
import {
    Form,
    Input,
    Button,
    DatePicker,
    Switch,

} from 'antd';

const AddEducation = (props) => {
    const [data, setData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    })
    const [error, setError] = useState()

    // const onChange = (e) => {
    //     setData({ ...data, [e.target.name]: e.target.value })
    // }
    // const onSelectChange = (value) => {
    //     setData({ ...data, status: value })
    // }
    const tailLayout = {
        labelCol: { span: 6 },
        wrapperCol: { offset: 6, span: 12 },
    };

    const onFinish = async (values) => {
        values.current = values.current ? true : false
        props.addEducation(values, props.history)
    };

    return (
        <div>
            <h1>Add Education</h1>
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

                <Form.Item label="School" name="school">
                    <Input
                        name="school"
                        // onChange={on Change}
                        placeholder="School"
                    />
                </Form.Item>

                <Form.Item label="Degree" name="degree">
                    <Input
                        name="degree"
                        // onChange={onChange}
                        placeholder="Degree"
                    />
                </Form.Item>


                <Form.Item label="Field of study" name="fieldofstudy">
                    <Input
                        name="fieldofstudy"
                        // onChange={onChange}
                        placeholder="Field of study"
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

                <Form.Item label="Program Description" name="description">
                    <Input
                        name="description"
                        // onChange={onChange}
                        placeholder="Program Description"
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" danger htmlType="submit">Add</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
})


export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation))

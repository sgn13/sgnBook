import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Button,
    Select,

} from 'antd';
import { setCurrentProfile } from '../../actions/profileActions'

const CreateProfile = (props) => {
    const [data, setData] = useState({
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        bio: '',
        githubusername: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: ''
    })
    const [error, setError] = useState()
    // const [form] = Form.useForm();

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
    console.log(data);

    const onFinish = async (values) => {
        props.setCurrentProfile(data, props.history)
        // form.resetFields();
    };


    return (
        <div>
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
                <Form.Item label="Profile Handler" name="handle">
                    <Input
                        placeholder="Profile Handler"
                        name="handle"
                        onChange={onChange}
                    />
                </Form.Item>

                <Form.Item label="Select Professional Status" name="status">
                    <Select
                        placeholder="Select Professional Status"
                        name="status"
                        onChange={onSelectChange}
                    >
                        <Select.Option value="School" name="status">School</Select.Option>
                        <Select.Option value="Higher School" name="status">Higher School</Select.Option>
                        <Select.Option value="Bachelor" name="status">Bachelor</Select.Option>
                        <Select.Option value="Masters" name="status">Masters</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Company" name="company">
                    <Input
                        name="company"
                        onChange={onChange}
                        placeholder="Company"
                    />
                </Form.Item>

                <Form.Item label="Website" name="website">
                    <Input
                        name="website"
                        onChange={onChange}
                        placeholder="Website"
                    />
                </Form.Item>

                <Form.Item label="Location" name="location">
                    <Input
                        name="location"
                        onChange={onChange}
                        placeholder="Location"
                    />
                </Form.Item>

                <Form.Item label="Skills" name="skills">
                    <Input
                        name="skills"
                        onChange={onChange}
                        placeholder="Skills"
                    />
                </Form.Item>

                <Form.Item label="Github Username" name="githubusername">
                    <Input
                        name="githubusername"
                        onChange={onChange}
                        placeholder="Github Username"
                    />
                </Form.Item>

                <Form.Item label="Short Bio" name="bio">
                    <Input
                        name="bio"
                        onChange={onChange}
                        placeholder="Short Bio"
                    />
                </Form.Item>
                    Add Social Network Links (Optional)
                <Form.Item label="Twitter Profile URL" name="twitter">
                    <Input
                        name="twitter"
                        onChange={onChange}
                        placeholder="Twitter Profile URL" size="small"
                    />
                </Form.Item>

                <Form.Item label="Facebook Profile URL" name="facebook">
                    <Input
                        name="facebook"
                        onChange={onChange}
                        placeholder="Facebook Profile URL" size="small"
                    />
                </Form.Item>

                <Form.Item label="LinkedIn Profile URL" name="linkedin">
                    <Input
                        name="linkedin"
                        onChange={onChange}
                        placeholder="LinkedIn Profile URL" size="small"
                    />
                </Form.Item>

                <Form.Item label="Youtube Channel URL" name="youtube">
                    <Input
                        name="youtube"
                        onChange={onChange}
                        placeholder="Youtube Channel URL" size="small"
                    />
                </Form.Item>

                <Form.Item label="Instagram Page URL" name="instagram">
                    <Input
                        name="instagram"
                        onChange={onChange}
                        placeholder="Instagram Page URL" size="small"
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" danger htmlType="submit">Create</Button>
                </Form.Item>
            </Form>

        </div>
    )
}

CreateProfile.propTypes = {
    setCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    profiles: state.profiles,
    loading: state.loading
})

export default connect(mapStateToProps, { setCurrentProfile })(withRouter(CreateProfile))

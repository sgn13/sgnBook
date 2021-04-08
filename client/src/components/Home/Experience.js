import React from 'react'
import { connect } from 'react-redux'
import { Form, Table, Button, Card, Descriptions, Timeline, Popconfirm } from 'antd';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { deleteExperience } from '../../actions/profileActions'
import Moment from 'react-moment'
import { ClockCircleOutlined, CloseOutlined } from '@ant-design/icons'
import './experience.css'

const { Column, ColumnGroup } = Table;


const Experience = (props) => {
    const handleDelete = (id) => {
        props.deleteExperience(id)
    }
    return (
        <div>
            <h1>Experience</h1>

            <Timeline mode="alternate">
                {
                    props.experience.map((exp) => (
                        <Timeline.Item>
                            <Card style={{ backgroundColor: '#f5eeed' }}>
                                <p> <strong>Company: </strong> {exp.company} </p>
                                <p> <strong>Title: </strong> {exp.title} </p>
                                <p> <strong>Interval: </strong>
                                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> - <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                                </p>
                                <Popconfirm
                                    title="Are you sure to delete this task?"
                                    onConfirm={handleDelete}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button>Delete</Button>
                                </Popconfirm>
                            </Card>
                        </Timeline.Item>
                    ))
                }
            </Timeline>

        </div>
    )
}
Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    profiles: state.profiles,
    loading: state.loading
})

export default connect(mapStateToProps, { deleteExperience })(Experience)

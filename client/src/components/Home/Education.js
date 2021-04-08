import React from 'react'
import { connect } from 'react-redux'
import { Form, Table, Button, Timeline, Card, Descriptions } from 'antd';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { deleteEducation } from '../../actions/profileActions'
import Moment from 'react-moment'
import './education.css'
const { Column, ColumnGroup } = Table;

const Education = (props) => {
    const handleDelete = (id) => {
        props.deleteEducation(id)
    }

    return (
        <div>
            <h1>Education</h1>

            <Timeline mode="alternate">
                {
                    props.education.map((edu) => (
                        <Timeline.Item>
                            <Card style={{ backgroundColor: '#f5eeed' }}>
                                <p> <strong>School: </strong> {edu.school} </p>
                                <p> <strong>Degree: </strong> {edu.degree} </p>
                                <p> <strong>Interval: </strong>
                                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> - <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                                </p>
                            </Card>
                        </Timeline.Item>
                    ))
                }
            </Timeline>
        </div>
    )
}
Education.propTypes = {
    deleteEducation: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    profiles: state.profiles,
    loading: state.loading
})

export default connect(mapStateToProps, { deleteEducation })(Education)

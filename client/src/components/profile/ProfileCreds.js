import React from 'react'
import Moment from 'react-moment'
import { Timeline, Card, Row, Col } from 'antd'

const ProfileCreds = (props) => {
    const { experience, education } = props
    const expItems = experience.map((exp) => (
        <Timeline.Item>
            <Card style={{ backgroundColor: '#f5eeed' }}>
                <p> <strong>Company: </strong> {exp.company} </p>
                <p> <strong>Title: </strong> {exp.title} </p>
                <p> <strong>Interval: </strong>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> - <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                </p>
            </Card>
        </Timeline.Item>
    ))

    const eduItems = education.map((edu) => (
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

    return (
        <div>
            <Row>
                <Col span={10}>
                    <h1>Experience</h1>
                    {expItems.length > 0 ? (<Timeline >{expItems}</Timeline>) : (<p>No Experience Listed</p>)}
                </Col>
                <Col span={10} offset={4}>
                    <h1>Education</h1>
                    {eduItems.length > 0 ? (<Timeline >{eduItems}</Timeline>) : (<p>No Education Listed</p>)}
                </Col>
            </Row>
        </div>
    )
}

export default ProfileCreds

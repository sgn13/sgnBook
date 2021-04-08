import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, Row, Col, Divider, List, Button } from 'antd'
import { CheckCircleOutlined, EnvironmentOutlined } from '@ant-design/icons'
import isEmpty from '../../validation/is_empty'

const ProfileItems = (props) => {
    const { profile } = props
    console.log(props.profile);

    const style = { background: '#0092ff', padding: '8px 0' };


    return (
        <Card style={{ marginBottom: '1rem' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={4} icon={<CheckCircleOutlined />}
                >

                    <img src={profile.user.avatar} alt="" style={{ borderRadius: '50%' }} />
                </Col>

                <Col className="gutter-row" span={9}>
                    <Divider orientation="left" style={{ border: '#485d94' }}>Basic Info</Divider>
                    <h2>{profile.user.name}</h2>
                    <p>{profile.status}{isEmpty(profile.company) ? null : (<span> at {profile.company}</span>)}</p>
                    <p>{isEmpty(profile.location) ? null : (<span><EnvironmentOutlined />{profile.location}</span>)}</p>
                    <Button>
                        <Link to={`/profile/${profile.handle}`}>
                            View Profile
                        </Link>
                    </Button>
                </Col>

                <Col className="gutter-row" span={8}>

                    <Divider orientation="left" style={{ border: '#485d94' }}>Skill set</Divider>

                    <List
                        size="small"
                        bordered
                        dataSource={profile.skills}
                        renderItem={item => <List.Item><CheckCircleOutlined /> {item}</List.Item>}
                    />
                </Col>

            </Row>

        </Card>
    )
}

ProfileItems.propTypes = {
    profiles: PropTypes.object.isRequired,
}

export default ProfileItems

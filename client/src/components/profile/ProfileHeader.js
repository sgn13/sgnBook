import React from 'react'
import { Card, Row, Col, Divider } from 'antd'
import isEmpty from '../../validation/is_empty'
import { Link } from 'react-router-dom'
import { GlobalOutlined, FacebookFilled, LinkedinFilled, YoutubeFilled, InstagramFilled } from '@ant-design/icons'


const ProfileHeader = props => {
    const { profile } = props
    console.log(profile);

    return (
        <div style={{ textAlign: 'center', backgroundColor: ' #1111' }}>
            <Row>
                <Col span={24}>
                    <img src={profile.user.avatar} alt="" style={{ borderRadius: '50%' }} />
                </Col>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <h2>{profile.user.name}</h2>
                    <p>{profile.status}{isEmpty(profile.company) ? null : (<span> at {profile.company}</span>)}</p>
                    <p>{isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}</p>
                    <p>{isEmpty(profile.social) ? null : (<a href={profile.social.twitter} target="_blank"><GlobalOutlined /></a>)}</p>
                    <p>{isEmpty(profile.social) ? null : (<a href={profile.social.facebook} target="_blank"><FacebookFilled />{profile.social.facebook}</a>)}</p>
                    <p>{isEmpty(profile.social) ? null : (<a href={profile.social.linkedIn} target="_blank"><LinkedinFilled />{profile.social.linkedIn}</a>)}</p>
                    <p>{isEmpty(profile.social) ? null : (<a href={profile.social.youtube} target="_blank"><YoutubeFilled />{profile.social.youtube}</a>)}</p>
                    <p>{isEmpty(profile.social) ? null : (<a href={profile.social.instagram} target="_blank"><InstagramFilled />{profile.social.instagram}</a>)}</p>
                </Col>
            </Row>
        </div>
    )
}

export default ProfileHeader

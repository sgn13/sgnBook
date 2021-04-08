import React from 'react'
import { Card, Row, Col, Divider } from 'antd'
import isEmpty from '../../validation/is_empty'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {CheckOutlined} from '@ant-design/icons'

const ProfileAbout = (props) => {
    const { profile } = props
    const firstName = profile.user.name?.trim().split(' ')[0];

    return (
        <div>
            <div>
                <Card style={{backgroundColor:'skyblue',textAlign:'center',color:'white'}}>
                <h1 style={{color:'white',fontWeight:'bold'}}>{firstName}'s Bio</h1>
                <p>{isEmpty(profile.bio) ? (<span>{firstName} doesn't have profile yet</span>) : (<span>{profile.bio}</span>)}</p>
                <h2 style={{color:'white',fontWeight:'bold'}}>Skill set</h2>
                <div>
                    {
                        profile.skills.slice(0, 4).map((skill, index) => (
                            <div key={index} style={{textAlign:'center'}}>
                                <Card style={{float:'left',padding:'0px',marginRight:'1rem'}}><CheckOutlined />{skill}</Card>
                            </div>
                        ))
                    }
                </div>
                </Card>
                <br />
            </div>
        </div>
    )
}

export default ProfileAbout

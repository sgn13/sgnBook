import React from 'react'
import { Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const ProfileAction = () => {
    return (
        <div style={{ padding: ' 1rem ' }}>

            <Button><Link to="/edit-profile">Edit Profile</Link></Button><br /><br />

            <Button><Link to="/add-experience">Add Experience</Link></Button><br /><br />

            <Button><Link to="/add-education">Add Education</Link></Button><br /><br />
        </div>
    )
}

export default ProfileAction

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import Loading from './Loading'
import { Button, Col, Row } from 'antd'
import ProfileAction from './ProfileAction'
import Experience from './Experience'
import Education from './Education'
import './dashboard.css'

const Dashboard = (props) => {

    const { user } = props.auth
    const { profile, loading } = props.profile
    let dashboardContent;

    const handleDeleteAccount = () => {
        props.deleteAccount();
    }
    if (profile === null || loading) {
        dashboardContent = <Loading />
    }
    else {
        if (Object.keys(profile).length > 0) {
            dashboardContent =
                <>
                    <div className="welcome">
                        <h3>Welcome, <Link to={`/profile/${profile.handle}`}>{user.name}</Link></h3>
                    </div>
                    <Row wrap={true}>
                        <Col span={16}>
                            <Experience experience={profile.experience} />
                            <Education education={profile.education} />
                        </Col>
                        <Col span={4} offset={4} style={{ borderLeft: '1px solid silver', padding: '1rem' }}>
                            <ProfileAction />
                            <Button type="primary" danger onClick={handleDeleteAccount}>Delete my account</Button><br /><br />
                        </Col>
                    </Row>

                </>
        } else {
            dashboardContent =
                <>
                    <p>Welcome {user.name}</p>
                    <p>You have not created profile, please add some info</p>
                    <Button type="primary" size='large' danger shape="round"><Link to="/create-profile">Create</Link></Button>
                </>
        }
    }


    useEffect(() => {
        props.getCurrentProfile()
    }, [])

    return (
        <div>
            {dashboardContent}
        </div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    profiles: state.profiles,
    loading: state.loading
})


export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)

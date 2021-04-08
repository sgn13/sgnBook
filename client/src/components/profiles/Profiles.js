import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Table, Button, Space, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getAllProfiles } from '../../actions/profileActions'
import Loading from '../Home/Loading'
import ProfileItems from './ProfileItems';
import './profiles.css'

const Profiles = (props) => {
    const { profiles, loading } = props.profile
    let profileItems
    if (profiles === null || loading) {
        profileItems = <Loading />
    } else {
        if (profiles.length > 0) {
            profileItems =
                profiles.map((profiles) => (
                    <ProfileItems key={profiles._id} profile={profiles} />
                ))
        }
        else {
            profileItems = <div>There is no profile</div>
        }
    }
    useEffect(() => {
        props.getAllProfiles()
    }, [])

    return (
        <div>
            {profileItems}
        </div>
    )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    profiles: state.profiles,
    loading: state.loading
})

export default connect(mapStateToProps, { getAllProfiles })(Profiles)


import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getProfileByHandle } from '../../actions/profileActions'
import ProfileHeader from './ProfileHeader'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'
import ProfileAbout from './ProfileAbout'
import Loading from '../Home/Loading'
import { Card } from 'antd'

const Profile = (props) => {
    console.log(props);
    const { profile, loading } = props.profile
    let displayProfile

    if (profile === null || loading) {
        displayProfile = <Loading />
    } else {
        displayProfile = (
            <>
                <div>
                    <Link to='/'> Back to profiles</Link>
                </div>
                <ProfileHeader profile={profile} />
                <ProfileAbout profile={profile} />
                <ProfileCreds education={profile.education} experience={profile.experience} />
                <ProfileGithub />
            </>
        )
    }

    useEffect(() => {
        if (props.match.params.handle) {
            props.getProfileByHandle(props.match.params.handle)
        }
    }, [])
    return (
        <div>
            <Card>
                {displayProfile}
            </Card>
        </div>
    )
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    profiles: state.profiles,
    loading: state.loading
})


export default connect(mapStateToProps, { getProfileByHandle })(Profile)


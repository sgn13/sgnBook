import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { withRouter } from 'react-router-dom'
import { clearCurrentProfile } from '../../actions/profileActions'

const { Header, Content, Footer } = Layout;

const Home = (props) => {

    const { isAuthenticated, user } = props.auth

    const handleLogout = () => {
        props.clearCurrentProfile();
        props.logoutUser(props.history);
    }

    const authLink = (
        <>
            <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/register">Register</Link></Menu.Item>
        </>
    )

    const guestLink = (
        <>
            <Menu.Item key="5"><Link to="/profiles">Profiles</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/feed">Post feed</Link></Menu.Item>
            <Menu.Item key="4" style={{ float: 'right', color: 'white' }} onClick={handleLogout}> <img src={user?.avatar} alt={user?.name} width="30px" style={{ marginRight: '10px', borderRadius: '50%' }} />LogOut</Menu.Item>
        </>
    )

    return (
        <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ backgroundColor: '#485d94' }} >
            <Menu.Item key="1"><Link to="/"><strong style={{ color: 'orange' }}>Super</strong></Link></Menu.Item>
            {isAuthenticated ? guestLink : authLink}
        </Menu>
    )
}

Home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(withRouter(Home));

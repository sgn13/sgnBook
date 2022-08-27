import React from 'react'
import { Dropdown, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { withRouter } from 'react-router-dom'
import { clearCurrentProfile } from '../../actions/profileActions'
import { LogoutOutlined } from '@ant-design/icons';
const { Header, Content } = Layout

const Home = (props) => {

    const { isAuthenticated, user } = props.auth

    const handleLogout = () => {
        props.clearCurrentProfile();
        props.logoutUser(props.history);
    }

    const configureAvatarImage = (image) => {
        // const id = this.props.payload._id;
        return `http://localhost:5000/staticUser/` + image;
    };

    const menu = (
        <Menu style={{ width: '10rem' }}>
            <Menu.Item>
                <Link to="/me">Profile</Link>
            </Menu.Item>

            <Menu.Item danger onClick={handleLogout}>
                <LogoutOutlined />
                LogOut
            </Menu.Item>
        </Menu>
    );

    const authLink = (
        <>
            <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/register">Register</Link></Menu.Item>
        </>
    )

    const guestLink = (
        <>
            <Header>
                <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ backgroundColor: '#1d8aa8' }}>
                    <Menu.Item key="1"><Link to="/"><strong style={{ color: 'orange', fontSize: "1rem" }}>Developers Platform</strong></Link></Menu.Item>
                    <Menu.Item key="5"><Link to="/profiles">Profiles</Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/profile">My profile</Link></Menu.Item>
                    <Menu.Item key="7"><Link to="/chat">Chat</Link></Menu.Item>
                    <Menu.Item key="4" style={{ float: 'right', color: 'white' }}>

                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{ display: 'flex', alignItems: 'center' }}>
                                <span>
                                    <img src={configureAvatarImage(user?.avatar)} alt="" width="30px" style={{ borderRadius: '50%', height: '35px', marginRight: '0.75rem' }} />
                                </span>
                                <span>
                                    {user.name}
                                </span>
                            </a>
                        </Dropdown>
                    </Menu.Item>

                </Menu>
            </Header>

        </>
    )

    return (
        <>
            {isAuthenticated ? guestLink : null}
        </>

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

import React from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Social/Login';
import Register from './components/Social/Register';
import Dashboard from './components/Home/Dashboard';
import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/create profile/CreateProfile';
import EditProfile from './components/edit profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Chat from './components/Chat/Chat';
import UpdateMe from './components/Social/UpdateMe';

const Router = () => {
    return (
        <>
            <PrivateRoute path='/profile' exact component={Dashboard} />
            <PrivateRoute path="/me" component={UpdateMe} />
            <PrivateRoute path="/profiles" component={Profiles} />
            <Route path='/login' component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile/:handle" component={Profile} />
            <PrivateRoute path="/myprofile" component={Dashboard} />
            <PrivateRoute path="/post/:id" component={Post} />
            <PrivateRoute path="/" exact component={Posts} />
            <PrivateRoute path="/create-profile" component={CreateProfile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <PrivateRoute path="/add-experience" component={AddExperience} />
            <PrivateRoute path="/add-education" component={AddEducation} />
            <PrivateRoute path="/chat" component={Chat} />
        </>
    )
}

export default Router

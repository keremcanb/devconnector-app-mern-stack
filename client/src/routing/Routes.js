import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CreateProfile from '../pages/CreateProfile';
import EditProfile from '../pages/EditProfile';
import AddExperience from '../pages/AddExperience';
import AddEducation from '../pages/AddEducation';
import Profiles from '../pages/Profiles';
import Profile from '../pages/Profile';
import Posts from '../pages/Posts';
import Post from '../components/post/Post';
import PrivateRoute from './PrivateRoute';

const Routes = () => (
  <Switch>
    <Route exact path="/register" component={Register} />
    <Route exact path="/profiles" component={Profiles} />
    <Route exact path="/profile/:id" component={Profile} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/create-profile" component={CreateProfile} />
    <PrivateRoute exact path="/edit-profile" component={EditProfile} />
    <PrivateRoute exact path="/add-experience" component={AddExperience} />
    <PrivateRoute exact path="/add-education" component={AddEducation} />
    <PrivateRoute exact path="/posts" component={Posts} />
    <PrivateRoute exact path="/posts/:id" component={Post} />
  </Switch>
);

export default Routes;

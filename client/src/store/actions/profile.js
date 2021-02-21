import axios, { get, post, put } from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS
} from '../types';

const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const { data } = await get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const { data } = await get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const { data } = await get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const { data } = await get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const createProfile = (formData, history, edit = false) => async (dispatch) => {
  try {
    const { data } = await post('/api/profile', formData, headers);
    dispatch({
      type: GET_PROFILE,
      payload: data
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const { data } = await put('/api/profile/experience', formData, headers);
    dispatch({
      type: UPDATE_PROFILE,
      payload: data
    });
    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const { data } = await put('/api/profile/education', formData, headers);
    dispatch({
      type: UPDATE_PROFILE,
      payload: data
    });
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: data
    });
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: data
    });
    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure?')) {
    try {
      await axios.delete('/api/profile');
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Account Deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};

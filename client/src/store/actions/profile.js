import api from '../../utils/api';
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

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const { data } = await api.get('/profile/me');
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
    const { data } = await api.get('/profile');
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
    const { data } = await api.get(`/profile/user/${userId}`);
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
    const { data } = await api.get(`/profile/github/${username}`);
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
    const { data } = await api.post('/profile', formData);
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
    const { data } = await api.put('/profile/experience', formData);
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
    const { data } = await api.put('/profile/education', formData);
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
    const { data } = await api.delete(`/profile/experience/${id}`);
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
    const { data } = await api.delete(`/profile/education/${id}`);
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
      await api.delete('/profile');
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

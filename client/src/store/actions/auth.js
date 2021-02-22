import api from '../../utils/api';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types';

export const loadUser = () => async (dispatch) => {
  try {
    const { data } = await api.get('/auth');
    dispatch({
      type: USER_LOADED,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.post('/users', formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    });
    dispatch(loadUser());
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  const body = { email, password };
  try {
    const { data } = await api.post('/auth', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });
    dispatch(loadUser());
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logoutUser = () => ({ type: LOGOUT });

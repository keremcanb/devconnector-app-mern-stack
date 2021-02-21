import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions/auth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated } = authState;

  const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Sign into Your Account
      </p>
      <form className="form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChangeHandler} />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={onChangeHandler}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don not have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};

export default Login;

import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated, loading } = authState;

  return (
    <Route
      {...rest}
      render={(props) => (!isAuthenticated && !loading ? <Redirect to="/login" /> : <Component {...props} />)}
    />
  );
};

export default PrivateRoute;

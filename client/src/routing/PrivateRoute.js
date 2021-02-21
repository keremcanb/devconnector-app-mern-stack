import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../components/layout/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated, loading } = authState;

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? <Spinner /> : isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;

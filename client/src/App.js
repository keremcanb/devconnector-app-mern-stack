import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/auth';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import Routes from './routing/Routes';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Routes />
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;

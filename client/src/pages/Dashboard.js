import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/layout/Spinner';
import DashboardActions from '../components/dashboard/DashboardActions';
import Experience from '../components/dashboard/Experience';
import Education from '../components/dashboard/Education';
import { getCurrentProfile, deleteAccount } from '../store/actions/profile';

const Dashboard = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const profileState = useSelector((state) => state.profile);
  const { profile, loading } = profileState;

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return !(loading && profile === null) ? (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa user"> Welcome {user && user.name}</i>
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button onClick={() => dispatch(deleteAccount())} className="btn btn-danger">
              <i className="fas fa-user-minus"> Delete My Account</i>
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not setup a profile yet, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  ) : (
    <Spinner />
  );
};

export default Dashboard;

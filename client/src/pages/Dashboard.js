import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../components/layout/Spinner';
import DashboardActions from '../components/dashboard/DashboardActions';
import Experience from '../components/dashboard/Experience';
import Education from '../components/dashboard/Education';
import { getCurrentProfile, deleteAccount } from '../store/actions/profile';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

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
            <button onClick={() => deleteAccount()} className="btn btn-danger">
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

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);

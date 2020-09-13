import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import DashboardActions from './DashboardActions';
// import Experience from './Experience';
// import Education from './Education';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

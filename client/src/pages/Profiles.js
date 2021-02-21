import { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../components/layout/Spinner';
import ProfileItem from '../components/profile/ProfileItem';
import { getAllProfiles } from '../store/actions/profile';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return (
    <>
      {!loading ? (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)
            ) : (
              <h4>No profiles found</h4>
            )}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);

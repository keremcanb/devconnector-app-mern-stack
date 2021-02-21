import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/layout/Spinner';
import ProfileItem from '../components/profile/ProfileItem';
import { getAllProfiles } from '../store/actions/profile';

const Profiles = () => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);
  const { profiles, loading } = profileState;

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

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

export default Profiles;

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/layout/Spinner';
import ProfileTop from '../components/profile/ProfileTop';
import ProfileAbout from '../components/profile/ProfileAbout';
import ProfileExperience from '../components/profile/ProfileExperience';
import ProfileEducation from '../components/profile/ProfileEducation';
import ProfileGithub from '../components/profile/ProfileGithub';
import { getProfileById } from '../store/actions/profile';

const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated, loading, user } = authState;
  const profileState = useSelector((state) => state.profile);
  const { profile } = profileState;

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {profile !== null ? (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {isAuthenticated && loading === false && user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((experience) => (
                    <ProfileExperience key={experience._id} experience={experience} />
                  ))}
                </>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((education) => (
                    <ProfileEducation key={education._id} education={education} />
                  ))}
                </>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Profile;

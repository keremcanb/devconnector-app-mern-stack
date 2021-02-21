import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGithubRepos } from '../../store/actions/profile';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);
  const { repos } = profileState;

  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, [username, dispatch]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>

      {repos !== null ? (
        repos.map(({ id, name, html_url, description, stargazers_count, watchers_count, forks_count }) => (
          <div key={id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href={html_url} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              </h4>
              <p>{description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: {stargazers_count}</li>
                <li className="badge badge-dark">Watchers: {watchers_count}</li>
                <li className="badge badge-light">Forks: {forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ProfileGithub;

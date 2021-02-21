import Moment from 'react-moment';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../store/actions/profile';

const Experience = ({ experience }) => {
  const dispatch = useDispatch();

  const experiences = experience.map(({ _id, title, company, from, to }) => (
    <tr key={_id}>
      <td>{company}</td>
      <td className="hide-sm">{title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{moment.utc(from)} </Moment> -{' '}
        {to === null ? ' Now' : <Moment format="YYYY/MM/DD">{moment.utc(to)} </Moment>}
      </td>
      <td>
        <button onClick={() => dispatch(deleteExperience(_id))} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

export default Experience;

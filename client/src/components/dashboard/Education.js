import { useDispatch } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteEducation } from '../../store/actions/profile';

const Education = ({ education }) => {
  const dispatch = useDispatch();

  const educations = education.map(({ _id, school, degree, from, to }) => (
    <tr key={_id}>
      <td>{school}</td>
      <td className="hide-sm">{degree}</td>
      <td>
        {formatDate(from)} - {to ? formatDate(to) : 'Now'}
      </td>
      <td>
        <button onClick={() => dispatch(deleteEducation(_id))} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default Education;

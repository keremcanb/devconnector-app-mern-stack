import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(({ id, alertType, msg }) => (
    <div key={id} className={`alert alert-${alertType}`}>
      {msg}
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alert
});

// import { useSelector } from 'react-redux';

// const Alert = () => {
//   const alertState = useSelector((state) => state.alert);
//   const { alerts } = alertState;

//   return (
//     alerts !== null &&
//     alerts.length > 0 &&
//     alerts.map(({ id, alertType, msg }) => (
//       <div key={id} className={`alert alert-${alertType}`}>
//         {msg}
//       </div>
//     ))
//   );
// };

export default connect(mapStateToProps)(Alert);

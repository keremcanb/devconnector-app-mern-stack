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

export default connect(mapStateToProps)(Alert);

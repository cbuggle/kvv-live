import React from "react"
import PropTypes from "prop-types"
class Departure extends React.Component {
  render () {
    return (
      <div className='departure'>
      {this.props.departure.keys}
        <div className='departure-route'>{this.props.departure.route}</div>
        <div className='departure-destination'>{this.props.departure.destination}</div>
        <div className='departure-time'>{this.props.departure.time}</div>
        <div className={'departure-direction departure-direction-' + this.props.departure.direction}>Direction: {this.props.departure.direction}</div>
      </div>
    );
  }
}

Departure.propTypes = {
  route: PropTypes.string,
  direction: PropTypes.node,
  destination: PropTypes.string,
  time: PropTypes.string
};
export default Departure

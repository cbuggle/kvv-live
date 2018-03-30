import React from "react"
import PropTypes from "prop-types"

  class Station extends React.Component {
  render () {
    return (
      <div>
        <div>Name: {this.props.name}</div>
        <div>Id: {this.props.id}</div>
        <div>Lat: {this.props.lat}</div>
        <div>Lon: {this.props.lon}</div>
      </div>
    );
  }
}

Station.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  lat: PropTypes.node,
  lon: PropTypes.node
};
export default Station

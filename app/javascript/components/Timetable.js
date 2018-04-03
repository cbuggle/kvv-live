import React from 'react'
import ReactDOM from 'react-dom'
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import Station from './Station'
import Departure from './Departure'

class Timetable extends React.Component {

  constructor(props) {
    super(props)
    if( JSON.stringify(props.stopname) == undefined){
      throw "Timetable constructor called without stopname";
    }
    this.state = {
      stopid: props.stopid,
      stopname: props.stopname,
      timestamp: Date.now(),
      departures: []
    }
  }

  componentDidMount() {
    this.startUpdateTicker( 4000 )
  }

  startUpdateTicker(){
    this.update()
    setInterval(() => { this.update()}, 4000);
  }

  update = () => {
    const stopid = this.state.stopid
    const list = fetch('/departures/bystop/' + stopid + '.json')
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          timestamp: result.timestamp,
          stopname: result.stopname || this.state.stopname ,
          departures: result.departures || []
        })
      }).catch((err) => {
      console.log(err.message);
    });
  }

  renderRescueInfoText () {
    var infoText = ''
    if(this.state.departures.length == 0){
      infoText = <div className="timetable-message">Für diese Haltestelle stellt der KVV derzeit keine Live-Informationen bereit.</div>
    }
    return(infoText);
  }

  render () {
    const departures = this.state.departures.map( (departure, i) => {
      return(
        <Departure key={i} departure={departure}/>
      )
    })
    return (
      <div className='timetable' key={this.state.stopid}>
          <h5 className='timetable-stopname'>
            { this.state.stopname }
          </h5>
          <div className='timetable-body'>
            { this.renderRescueInfoText() }
          <div className='timetable-departures'>
            { departures }
          </div>
          </div>
      </div>
    );
  }
}

Timetable.propTypes = {
  stopid: PropTypes.string,
  stopname: PropTypes.string,
  departures: PropTypes.arrayOf(Departure)
};

export default Timetable

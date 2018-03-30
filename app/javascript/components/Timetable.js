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
      refreshInterval: 5000,
      stopid: props.stopid,
      stopname: props.stopname,
      timestamp: Date.now(),
      departures: []
    }

  }

  componentDidMount() {
    this.update()
    setInterval(() => { this.update()}, 10000);
  }

  update = () => {
    console.log("Timetable update: " + stopid)
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
    var info = ''
    if(this.state.departures.length == 0){
      info = <div className="timetable-info">Für diese Haltestelle stellt der KVV derzeit keine Live-Informationen bereit.</div>
    }
    return(info);
  }


  render () {
    const departures = this.state.departures.map( (departure, i) => {
      return(
        <Departure key={i} departure={departure}/>
      )
    })

    return (
      <div className='timetable-item' key={this.state.stopid}>
        <h2 className='timetable-stop-name'>{ this.state.stopname }</h2>
        <div className='timetable-timestamp'>
          Aktualisiert: {<Moment time={this.state.timestamp} format='HH:mm:ss' />}h
        </div>
        { this.renderRescueInfoText() }
        <h3  className='timetable-headline'> Abfahrten </h3>
        <div className='timetable-departures'>{departures}</div>
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

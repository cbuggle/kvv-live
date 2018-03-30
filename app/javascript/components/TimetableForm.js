import React from "react"
import Clock from 'react-live-clock'
import PropTypes from "prop-types"
import Timetable from "./Timetable"

class TimetableForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      stopSuggestions: [],
      timetables: []
    }
  }

  componentDidMount() {
    setInterval(() => { this.updateTimetables()}, 15000);
  }

  updateTimetables() {
    console.log("Form updates Timetables")
    this.state.timetables.map( (timetable) => {
      console.log("Form updates Timetables " + timetable.state.stopname )
      timetable.update()
    })
  }

  handleChange = (event) => {
    const stopName = event.target.value

    if (stopName.length > 1){
      const list = fetch('/stops/byname/' + stopName + '.json')
        .then((response) => response.json())
        .then((result) => {
          this.setState({ stopSuggestions: result})
        }).catch((err) => {
          console.log(err.message);
        });
    }
  }

  addTimetable = (event) => {
    const stopid = event.target.dataset.stopid

    var timetables = this.state.timetables

    if (!timetables.find( t => t.state.stopid === stopid)){
      timetables.push( new Timetable( event.target.dataset ) )
    }

    this.setState({timetables: timetables})
  }

  renderForm(){
    return (
        <div>
          <Clock format={'HH:mm:ss'} ticking={true} />
          <form>
            <input type="text"
                className="js-timetable-input.stopname-input"
                onChange={this.handleChange}

                placeholder="Haltestelle" />
          </form>
        </div>
      )
  }

  renderStopSuggestions() {
    const suggestions = this.state.stopSuggestions.map( (suggestion) =>
        <li key={suggestion.id} id={suggestion.id} className='stop-suggestion'>
            <button onClick={this.addTimetable} data-stopid={suggestion.id} data-stopname={suggestion.name}> + </button>
          <div>
            {suggestion.name}
          </div>
        </li>
    )
    return (
      <div>
        <h2> Haltestellen </h2>
        <ul className="stop-suggestions">{ suggestions }</ul>
      </div>
    )
  }

  renderTimetables() {
    const timetables = this.state.timetables.map( (timetable) => {
      return(
        <div key={timetable.state.stopid} >

          <Timetable stopid={timetable.state.stopid} stopname={timetable.state.stopname}/>
        </div>
      )
      }
    )
    return(
      <div>
        { timetables }
      </div>
    )
  }

  render() {
    return (
      <div>
      <div>
      { this.renderForm() }
      { this.renderStopSuggestions() }
      </div>
      <div className="timetable-list">
        { this.renderTimetables() }
      </div>
      </div>
    );
  }
}

TimetableForm.propTypes = {
  typedName: PropTypes.string,
  suggestions: PropTypes.array
};
export default TimetableForm


import React from "react"
import ReactDOM from "react-dom"
import Clock from 'react-live-clock'
import PropTypes from "prop-types"
import Timetable from "./Timetable"

class TimetableForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      timetableListElement: 'timetable-list',
      stopSuggestions: [],
      suggestionsVisible: false,
      timetables: []
    }
  }

  componentDidUpdate() {
    ReactDOM.render( this.renderTimetables(), document.getElementById( this.state.timetableListElement) )
  }

  handleChange = (event) => {
    const stopName = event.target.value

    if (stopName.length > 1){
      const list = fetch('/stops/byname/' + stopName + '.json')
        .then((response) => response.json())
        .then((result) => {
          this.setState({ stopSuggestions: result, suggestionsVisible: true})
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

    this.setState({timetables: timetables, suggestionsVisible: false})
  }

  renderForm(){
    return (
        <div>
          <form className="form-inline">
            <input type="text"
                className="js-timetable-input.stopname-input"
                onChange={this.handleChange}
                placeholder="Haltestelle" />
          </form>
          <Clock format={'HH:mm:ss'} ticking={true} />
        </div>
      )
  }

  renderStopSuggestions() {
    const suggestions = this.state.stopSuggestions.map( (suggestion) =>
        <li key={suggestion.id} id={suggestion.id} className='stop-suggestion'>
          <button onClick={this.addTimetable} data-stopid={suggestion.id} data-stopname={suggestion.name}>
            {suggestion.name}
          </button>
        </li>
    )
    return (
      <div className={'stop-suggestions-visible-' + this.state.suggestionsVisible }>
        <ul className="stop-suggestions">{ suggestions }</ul>
      </div>
    )
  }

  renderTimetables() {
    const timetables = this.state.timetables.map( (timetable) => {
      return(
          <Timetable key={timetable.state.stopid} stopid={timetable.state.stopid} stopname={timetable.state.stopname}/>
      )
      }
    )
    return(timetables)
  }

  render() {
    return (
      <div>
        { this.renderForm() }
        { this.renderStopSuggestions() }
      </div>
    );
  }
}

TimetableForm.propTypes = {
  typedName: PropTypes.string,
  suggestions: PropTypes.array
};
export default TimetableForm


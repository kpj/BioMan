import React from 'react'
import { connect } from 'react-redux'

class Image extends React.Component {
  constructor () {
    super()
    this.state = {
      command: 'echo hay; sleep 10'
    }
  }

  render () {
    return (
      <li>
        <button onClick={this.onButtonClick.bind(this)}>{this.props.name}</button>
        <input type="text" value={this.state.command} onChange={this.updateInputValue.bind(this)}/>
      </li>
    )
  }

  updateIds () {
    let url = '/api/logs/'
    for (let i of this.state.ids) {
      fetch(`${url}${i}`, {method: 'GET'})
      .then(res => res.json())
      .then(json => {
        this.setState({output: json.data})
      })
    }
  }

  onButtonClick () {
    let url = '/api/run/' + this.props.name.replace(/\//g, '__') + '/' + this.state.command

    fetch(url, {method: 'POST', body: 'command=hui'})
    .then(res => res.json())
    .then(json => {
      this.props.addContainer(json.data)
    })
  }

  updateInputValue (evt) {
    this.setState({
      command: evt.target.value
    })
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addContainer: (id) => {
      dispatch({
        type: 'ADD_CONTAINER',
        id: id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Image);

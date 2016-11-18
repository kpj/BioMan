import React from 'react'
import { connect } from 'react-redux'

class Image extends React.Component {
  constructor () {
    super()
    this.state = {
      command: 'for i in "/input/"* ; do echo "> $i" ; cp -v "$i" "/output/processed_$(basename $i)" ; sleep 1 ; done'
    }
  }

  render () {
    return (
      <li>
        <button onClick={this.onButtonClick.bind(this)}>{this.props.name}</button>
        <input type="text" size="100" value={this.state.command} onChange={this.updateInputValue.bind(this)}/>
        <br/>
        <form action={`/api/files/upload`} method="POST" encType="multipart/form-data">
          <input type="file" name="sampleFile" />
          <input type="submit" value="Upload!" />
        </form>
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
    let url = '/api/run/' + encodeURIComponent(this.props.name) + '/' + encodeURIComponent(this.state.command)

    fetch(url, {method: 'POST'})
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

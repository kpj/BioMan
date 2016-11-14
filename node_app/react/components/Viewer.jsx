import React from 'react'
import { connect } from 'react-redux'

class View extends React.Component {
  constructor () {
    super()
    this.state = {
      output: 'empty',
      files: []
    }
  }

  componentDidMount () {
    this.update()
    setInterval(this.update.bind(this), 2000)
  }

  render () {
    return (
      <div>
        <h3>{this.props.cid}</h3>
        <pre>{this.state.output}</pre>
        <ul>
          {this.state.files.map((file, idx) => {
            return (
              <li key={idx}>
                <form method="GET" action={`/api/files/${this.props.cid}/${file}`}>
                  <button type="SUBMIT">{file}</button>
                </form>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  update () {
    fetch(`/api/logs/${this.props.cid}`, {method: 'GET'})
    .then(res => res.json())
    .then(json => {
      this.setState({output: json.data})
    })

    fetch(`/api/files/${this.props.cid}`, {method: 'GET'})
    .then(res => res.json())
    .then(json => {
      this.setState({files: json.data})
    })
  }
}

class Viewer extends React.Component {
  constructor () {
    super()
    this.state = {

    }
  }

  render () {
    return (
      <div>
        <h2>Running containers</h2>
        <ul>
          {this.props.containers.map((container_id, idx) => {
            return <View key={idx} cid={container_id}/>
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    containers: state.swarm.containers || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);

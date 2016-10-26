import React from 'react'

class NodeList extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 'not loaded'
    }

    this.updateNodes()
    setInterval(this.updateNodes.bind(this), 5000)
  }

  render () {
    return (
      <pre>{this.state.value.split('\\n').map(i => {
        return <span>{i}<br/></span>
      })}</pre>
    )
  }

  updateNodes () {
    fetch('/api/nodes', {method: 'GET'})
    .then(res => {
      return res.json()
    })
    .then(body => {
      this.setState({
        value: body['data']
      })
    })
    .catch(err => {
      this.setState({
        value: 'error: ' + err
      })
    })
  }
}

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <h1>BiotoolsManager</h1>
        <NodeList/>
      </div>
    )
  }
}

export default App

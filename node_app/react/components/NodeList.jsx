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
      <div>
        <h2>Node Overview</h2>
        <pre>{this.state.value.split('\\n').map(i => {
          return <span>{i}<br/></span>
        })}</pre>
      </div>
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
  }
}

export default NodeList

import React from 'react'

class ServiceList extends React.Component {
  constructor () {
    super()
    this.state = {
      value: 'not loaded'
    }

    this.updateNodes()
    setInterval(this.updateNodes.bind(this), 2000)
  }

  render () {
    return (
      <div>
        <h2>Service Overview</h2>
        <pre>{this.state.value.split('\\n').map((service, idx) => {
          return <span key={idx}>{service}<br/></span>
        })}</pre>
      </div>
    )
  }

  updateNodes () {
    fetch('/api/services', {method: 'GET'})
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

export default ServiceList

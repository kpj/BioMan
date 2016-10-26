import React from 'react'

class Registry extends React.Component {
  constructor() {
    super()
    this.state = {
      images: []
    }

    this.loadRegistry()
  }

  render () {
    return (
      <div>
        <h2>Image Registry</h2>
        <ul>
          {this.state.images.map(img => {
            return <li>{img}</li>
          })}
        </ul>
      </div>
    )
  }

  loadRegistry() {
    fetch('/api/registry', {method: 'GET'})
    .then(res => {
      return res.json()
    })
    .then(body => {
      this.setState({
        images: body['data']['repositories']
      })
    })
  }
}

export default Registry

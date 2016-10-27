import React from 'react'

class Image extends React.Component {
  render () {
    return (
      <li onClick={this.onClick.bind(this)}>
        <button>{this.props.name}</button>
      </li>
    )
  }

  onClick () {
    fetch('/api/run/' + this.props.name.replace(/\//g, '__'), {method: 'POST'})
    .then(res => res.json())
    .then(json => console.log(json))
  }
}

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
            return <Image name={img}/>
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

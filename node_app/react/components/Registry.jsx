import React from 'react'

class Image extends React.Component {
  constructor() {
    super()
    this.state = {
      command: 'sleep 10'
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

  onButtonClick () {
    let url = '/api/run/' + this.props.name.replace(/\//g, '__') + '/' + this.state.command

    fetch(url, {method: 'POST'})
    .then(res => res.json())
    .then(json => console.log(json))
  }

  updateInputValue (evt) {
    this.setState({
      command: evt.target.value
    })
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
          {this.state.images.map((img, idx) => {
            return <Image key={idx} name={img}/>
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

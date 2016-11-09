import React from 'react'

class Image extends React.Component {
  constructor() {
    super()
    this.state = {
      command: 'sleep 10',
      ids: [],
      output: ''
    }

    setInterval(this.updateIds.bind(this), 2000)
  }

  render () {
    return (
      <li>
        <button onClick={this.onButtonClick.bind(this)}>{this.props.name}</button>
        <input type="text" value={this.state.command} onChange={this.updateInputValue.bind(this)}/><br/>
        Output: <span>{this.state.output}</span>
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
      console.log(json)
      this.state.ids.push(json.data)
    })
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

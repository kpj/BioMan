import React from 'react'
import NodeList from './NodeList.jsx'
import Registry from './Registry.jsx'

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <h1>BiotoolsManager</h1>
        <NodeList/><br/>
        <Registry/>
      </div>
    )
  }
}

export default App

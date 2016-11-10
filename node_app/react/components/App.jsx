import React from 'react'
import ServiceList from './ServiceList.jsx'
import Registry from './Registry.jsx'
import Viewer from './Viewer.jsx'

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <h1>BiotoolsManager</h1>
        <ServiceList/><br/>
        <Registry/>
        <Viewer/>
      </div>
    )
  }
}

export default App

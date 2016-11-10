import React from 'react'
import { connect } from 'react-redux'

import Image from './Image.jsx'

class Registry extends React.Component {
  render () {
    return (
      <div>
        <h2>Image Registry</h2>
        <ul>
          {this.props.images.map((img, idx) => {
            return <Image key={idx} name={img}/>
          })}
        </ul>
      </div>
    )
  }

  componentDidMount () {
    fetch('/api/registry', {method: 'GET'})
    .then(res => {
      return res.json()
    })
    .then(body => {
      this.props.setImages(body['data']['repositories'])
    })
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.registry.images || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setImages: (images) => {
      dispatch({
        type: 'SET_IMAGES',
        images: images
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registry)

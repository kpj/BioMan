import { combineReducers } from 'redux'

const imageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return Object.assign({}, state, { images: action.images })
    default:
      return state
  }
}

const swarmReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CONTAINER':
      let conts = (state.containers || []).concat([action.id])
      return Object.assign({}, state, { containers: conts })
    default:
      return state
  }
}

const appReducers = combineReducers({
  registry: imageReducer,
  swarm: swarmReducer
})

export default appReducers

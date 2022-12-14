import { cloneDeep } from 'lodash'

function reducer(state, action) {
  switch (action.type) {
    case 'CLEAR_STATE':
      return { ...state, ...action.data }

    case 'ADD_FX_PAIR':
      const fxId = action.data.id
      const pairExist = state.fxPairData[fxId] || {}
      return {
        ...state,
        fxPairData: {
          ...state.fxPairData,
          [fxId]: { ...pairExist, ...action.data }
        }
      }

    case 'REMOVE_FX_PAIR':
      const copyFxPairs = cloneDeep(state.fxPairData)
      delete copyFxPairs[action.data]
      return { ...state, fxPairData: { ...copyFxPairs } }

    case 'UPDATE_FX_PAIR':
      const { id, payload } = action.data
      return { ...state, fxPairData: { ...state.fxPairData, [id]: payload } }

    default:
      return state
  }
}

export default reducer
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  const res = {}
  const types = [REQUEST, SUCCESS, FAILURE]
  types.forEach(function(type) { res[type] = `${base}_${type}` })
  return res
}

export const REQUEST_SAMPLE = createRequestTypes('REQUEST_SAMPLE')

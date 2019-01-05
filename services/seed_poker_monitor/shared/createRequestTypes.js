const START = 'START'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export default function createRequestTypes(base) {
  const res = {}
  const types = [START, SUCCESS, FAILURE]
  types.forEach(function(type) { res[type] = `${base}_${type}` })
  return res
}

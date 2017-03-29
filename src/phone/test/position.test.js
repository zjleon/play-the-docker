// const PositionService = require('../service/Position')
import PositionService from '../service/Position'

let positionService = null

const sampleDatas = [
  [1, 1],
  [2, 1],
  [3, 1],
]

beforeEach(() => {
  positionService = new PositionService({
    threshold: 3,
  })
})
afterEach(() => {
  positionService = null
})

test('it should return null after populating 1 item', () => {
  expect(positionService.populateX(sampleDatas[0][0], sampleDatas[0][1])).toBe(null)
})

test('it should return endpoint of t after populating 3 items', () => {
  const result = sampleDatas.map((sampleData) => {
    return positionService.populateX(sampleData[0], sampleData[1])
  })
  expect(result[2]).toBe(6)
})

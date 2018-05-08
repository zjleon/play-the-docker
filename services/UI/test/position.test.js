import PositionService from '../service/Position'
// import jest from 'jest'

const sampleDatas = [
  [1, 1],
  [2, 1],
  [3, 1],
]

test('it should return null after populating 1 item', () => {
  let positionService = new PositionService({
    threshold: 3,
  })
  expect(positionService.populateX(sampleDatas[0][0], sampleDatas[0][1])).toBe(null)
})

test('it should return endpoint of t after populating 3 items', () => {
  let positionService = new PositionService({
    threshold: 3,
  })
  const result = sampleDatas.map((sampleData) => {
    return positionService.populateX(sampleData[0], sampleData[1])
  })
  expect(result[2]).toBe(14)
})

test('it should not trigger callback after 100ms without populating data', () => {
  jest.useFakeTimers()
  const onReachTimer = jest.fn()
  let positionService = new PositionService({
    threshold: 3,
    timerClock: 100,
    onReachTimer
  })
  jest.runOnlyPendingTimers()
  expect(onReachTimer).not.toBeCalled()
})

test('it should trigger callback after 100ms with populating 3 datas to x and y respectively', () => {
  jest.useFakeTimers()
  const onReachTimer = jest.fn()
  let positionService = new PositionService({
    threshold: 3,
    timerClock: 100,
    onReachTimer
  })
  sampleDatas.map((sampleData) => {
    positionService.populateX(sampleData[0], sampleData[1])
    positionService.populateY(sampleData[0], sampleData[1])
    return
  })
  jest.runOnlyPendingTimers()
  expect(onReachTimer).toBeCalled()
})

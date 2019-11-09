import uuidv4 from 'uuid/v4'
class monitor {
  constructor() {
    this.id = uuidv4()
  }
}

let monitors = {}
function join() {
  const newMonitor = new monitor()
  monitors[newMonitor.id] = newMonitor
  return newMonitor.id
}
function leave(monitorId) {
  delete monitors[newMonitor.id]
}

export {
  join,
  leave,
}

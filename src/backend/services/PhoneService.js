class PhoneService {
  constructor() {

  }

  onMessageReceive(connection, message) {
    console.log(message)
  }
}

export default new PhoneService

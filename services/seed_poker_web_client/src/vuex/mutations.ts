const mutations = {
  setMessageTypes(state: any, messageTypes: any) {
    state.messageTypes = messageTypes;
  },
  setSocketConnected(state: any, connected: boolean) {
    state.socketConnected = connected;
  },
};

export default mutations;

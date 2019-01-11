const actions = {
  setMessageTypes({commit}: {commit: any}, messageTypes: object): void {
    // WSConnection = new w3cwebsocket(wsEndpoint + '/game', 'echo-protocol');
    commit('setMessageTypes', messageTypes);
  },
  wsConnected({commit}: {commit: any}): void {
    commit('setSocketConnected', true);
  },
  wsError({commit}: {commit: any}): void {
    // commit('setMessageTypes', messageTypes);
  },
  wsClosed({commit}: {commit: any}): void {
    commit('setSocketConnected', false);
  },
  wsGetMessage({commit}: {commit: any}): void {
    // commit('setSocketConnected', false);
  },
};

export default actions;

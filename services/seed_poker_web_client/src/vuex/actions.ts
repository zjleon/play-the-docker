import WSConnection from '../side-effects/websocket';

const actions = {
  setMessageTypes({commit}: {commit: any}, messageTypes: object): void {
    // WSConnection = new w3cwebsocket(wsEndpoint + '/game', 'echo-protocol');
    commit('setMessageTypes', messageTypes);
  },
  setWSState({commit}: {commit: any}, connected: boolean): void {
    commit('setSocketConnected', connected);
  },
  wsError({commit}: {commit: any}): void {
    // commit('setMessageTypes', messageTypes);
  },
  wsGetMessage(
    {commit, state}: {commit: any, state: any},
    {message, data}: {message: string, data: any},
  ): void {
    // commit('setSocketConnected', false);
    switch (message) {
      case state.messageTypes.PLAYER_STATE:
        commit('updatePlayer', data);
        break;
      case state.messageTypes.GAME_ROUND:
        // TODO: get text in the view?
        commit('updateGameState', data);
        break;
      default:
    }
  },
  wsSendMessage(
    {commit, state}: {commit: any, state: any},
    message: string,
    data?: any,
  ): void {
    if (state.messageTypes && state.messageTypes[message]) {
      const payload = {
          message: state.messageTypes[message],
          data,
        };
      WSConnection.send(JSON.stringify(payload));
    }
  },
};

export default actions;

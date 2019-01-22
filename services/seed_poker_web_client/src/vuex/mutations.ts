const mutations = {
  setMessageTypes(state: any, messageTypes: any): void {
    state.messageTypes = messageTypes;
  },
  setSocketConnected(state: any, connected: boolean): void {
    state.socketConnected = connected;
  },
  updatePlayer(state: any, player: object): void {
    state.player = player;
  },
  updateGameState(state: any, currentRound: string): void {
    state.currentRound = currentRound;
  },
};

export default mutations;

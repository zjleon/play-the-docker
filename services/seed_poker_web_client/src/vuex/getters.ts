const getters = {
  gameState: (state: any): string => {
    if (!state.messageTypes) { return ''; }
    const messagesInCurrentRound = state.messageTypes.GAME_STATE[state.currentRound - 1];
    switch (state.currentRound) {
      case 1:
        if (state.player.id) {
          return messagesInCurrentRound.JOINT;
        }
      case 3:
      // TODO: do something
      default:
        return messagesInCurrentRound.DEFAULT;
    }
  },
};

export default getters;

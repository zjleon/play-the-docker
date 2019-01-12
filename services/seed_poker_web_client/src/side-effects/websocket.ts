import { w3cwebsocket } from 'websocket';
import { wsEndpoint } from '../constants';
import store from '../store';

const WSConnection = new w3cwebsocket(wsEndpoint + '/game', 'echo-protocol');
WSConnection.onmessage = (e): void => {
  store.dispatch('wsGetMessage', JSON.parse(e.data));
};

WSConnection.onerror = (): void => {
  store.dispatch('wsError');
};

WSConnection.onclose = (): void => {
  store.dispatch('setWSState', false);
};

WSConnection.onopen = (): void => {
  store.dispatch('setWSState', true);
};

export default WSConnection;

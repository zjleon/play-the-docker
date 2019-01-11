import { w3cwebsocket } from 'websocket';
import { wsEndpoint } from '../constants';
import store from '../store';

const WSConnection = new w3cwebsocket(wsEndpoint + '/game', 'echo-protocol');
WSConnection.onmessage = (e): void => {
  console.log('Received: \'' + JSON.stringify(e.data) + '\'');
  store.dispatch('wsGetMessage', e.data);
};

WSConnection.onerror = (): void => {
  store.dispatch('wsError');
};

WSConnection.onclose = (): void => {
  store.dispatch('wsClosed');
};

WSConnection.onopen = (): void => {
  store.dispatch('wsConnected');
};

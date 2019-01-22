import axios from 'axios';
import { endpoint } from '../constants';
import store from '../store';

axios(endpoint + '/getMessageTypes').then((response): void => {
  store.dispatch('setMessageTypes', response.data);
});


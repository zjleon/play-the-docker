import { endpoint } from '../constants';
import axios from 'axios';

const actions = {
  getMessageTypes({commit}: {commit: any}) {
    axios(endpoint + '/getMessageTypes').then((response) => {
      commit('setMessageTypes', response.data);
    });
  },
};

export default actions;

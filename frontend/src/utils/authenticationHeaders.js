import getToken from './getToken';

export default {
  headers: {
    'X-AUTH': getToken(),
    'Content-Type': 'application/json'
  }
};

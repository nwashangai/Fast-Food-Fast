const BASE_URL = 'https://my-fast-food.herokuapp.com/api/v1/';

/**
 * Make fetch API request to the server
 * @param {String} type request method
 * @param {String} urlString URL path
 * @param {Object} payload request body
 */
const request = (type, urlString, payload = {}) => {
  const url = `${BASE_URL}${urlString}`;
  if (type === 'get') {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('token-key') || null,
      },
      credentials: 'omit',
    }).then((res) => {
      return res.json();
    }).then((res) => {
      return res;
    }, (error) => {
      throw error;
    });
  }
  if (type === 'post') {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('token-key') || null,
      },
      credentials: 'omit',
    }).then((res) => {
      return res.json();
    }).then((res) => {
      return res;
    }, (error) => {
      throw error;
    });
  }
  if (type === 'put') {
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('token-key') || null,
      },
      credentials: 'omit',
    }).then((res) => {
      return res.json();
    }).then((res) => {
      return res;
    }, (error) => {
      throw error;
    });
  }
  if (type === 'delete') {
    return fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('token-key') || null,
      },
      credentials: 'omit',
    }).then((res) => {
      return res.json();
    }).then((res) => {
      return res;
    }, (error) => {
      throw error;
    });
  }
  return { status: 'error', message: 'specify a valid request method' };
}

/**
 * Decode user token
 * @param {String} userToken 
 */
const jwt_decode = (userToken) => {
    let token = {};
    token.raw = userToken;
    token.header = JSON.parse(window.atob(userToken.split('.')[0]));
    token.payload = JSON.parse(window.atob(userToken.split('.')[1]));
    return (token)
}
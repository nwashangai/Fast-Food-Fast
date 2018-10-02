const BASE_URL = 'https://my-fast-food.herokuapp.com/api/v1/';

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

const jwt_decode = (t) => {
    let token = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split('.')[0]));
    token.payload = JSON.parse(window.atob(t.split('.')[1]));
    return (token)
}
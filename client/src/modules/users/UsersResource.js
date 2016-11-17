const API_URL = 'http://192.168.25.176:3000/api';

class UsersResource {
  getAll() {
    let parameters = { method: 'GET' };
    let endpoint = API_URL + '/users';

    return fetch(endpoint, parameters).then(response => {
      return response.json();
    });
  }

  getById(id) {
    let parameters = { method: 'GET' };
    let endpoint = API_URL + '/users/' + id;

    return fetch(endpoint, parameters).then(response => {
      return response.json();
    });
  }

  delete(ids) {
    let parameters = { method: 'DELETE' };
    let endpoint = API_URL + '/users/' + ids;

    return fetch(endpoint, parameters).then(response => {
      return response.json();
    });
  }

  update(id, data) {
    let parameters = {
      method: 'PUT',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data)
    };

    let endpoint = API_URL + '/users/' + id;

    return fetch(endpoint, parameters).then(response => {
      return response.json();
    });
  }

  create(data) {
    let parameters = {
      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data)
    };

    let endpoint = API_URL + '/users';

    return fetch(endpoint, parameters).then(response => {
      return response.json();
    });
  }
}

const usersResourceInstance = new UsersResource();

export default usersResourceInstance;

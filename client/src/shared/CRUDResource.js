class CRUDResource {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAll() {
    let parameters = { method: 'GET' };

    return fetch(this.endpoint, parameters).then(response => {
      return response.json();
    });
  }

  getById(id) {
    let parameters = { method: 'GET' };

    return fetch(`${this.endpoint}/${id}`, parameters).then(response => {
      return response.json();
    });
  }

  delete(ids) {
    let parameters = { method: 'DELETE' };

    return fetch(`${this.endpoint}/${ids}`, parameters).then(response => {
      return response.json();
    });
  }

  update(id, data) {
    let parameters = {
      method: 'PUT',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data)
    };

    return fetch(`${this.endpoint}/${id}`, parameters).then(response => {
      return response.json();
    });
  }

  create(data) {
    let parameters = {
      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data)
    };

    return fetch(this.endpoint, parameters).then(response => {
      return response.json();
    });
  }
}

export default CRUDResource;

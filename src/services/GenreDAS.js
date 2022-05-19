import http from "../http-login";

class GenreDAS {
  getAll() {
    return http.get("/genre/");
  }

  get(id) {
    return http.get(`/genre/${id}`);
  }

  create(data) {
    return http.post("/genre/create", data);
  }

  update(id, data) {
    return http.put(`/genre/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/genre/delete/${id}`);
  }
}

export default new GenreDAS();
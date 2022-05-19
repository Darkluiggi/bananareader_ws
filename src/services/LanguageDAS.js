import http from "../http-login";

class LanguageDAS {
  getAll() {
    return http.get("/language/");
  }

  get(id) {
    return http.get(`/language/${id}`);
  }

  create(data) {
    return http.post("/language/create", data);
  }

  update(id, data) {
    return http.put(`/language/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/language/delete/${id}`);
  }
}

export default new LanguageDAS();
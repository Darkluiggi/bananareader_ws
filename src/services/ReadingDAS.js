import http from "../http-login";

class ReadingDAS {
  getAll() {
    return http.get("/reading/");
  }

  get(id) {
    return http.get(`/reading/${id}`);
  }

  create(data) {
    return http.post("/reading/create", data);
  }

  update(id, data) {
    return http.put(`/reading/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/reading/delete/${id}`);
  }
}

export default new ReadingDAS();
import http from "../http-login";

class NarratorDAS {
  getAll() {
    return http.get("/narrator/");
  }

  get(id) {
    return http.get(`/narrator/${id}`);
  }

  create(data) {
    return http.post("/narrator/create", data);
  }

  update(id, data) {
    return http.put(`/narrator/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/narrator/delete/${id}`);
  }
}

export default new NarratorDAS();
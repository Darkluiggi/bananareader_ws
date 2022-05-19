import http from "../http-login";

class BookDAS {
  getAll() {
    return http.get("/Book/");
  }

  get(id) {
    return http.get(`/book/${id}`);
  }

  create(data) {
    return http.post("/book/create", data);
  }

  update(id, data) {
    return http.put(`/book/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/book/delete/${id}`);
  }
}

export default new BookDAS();
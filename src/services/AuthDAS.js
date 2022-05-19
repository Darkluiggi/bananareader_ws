import http from "../http-login";

class AuthDAS {
  login(data) {
    return http.post("/login", data);
  }

  register(data) {
    return http.post("/register", data);
  }

  
  
}

export default new AuthDAS();
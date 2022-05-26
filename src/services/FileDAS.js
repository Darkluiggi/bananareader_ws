import http from "../http-file";

class FileDAS {
  getAll() {
    return http.get("/AudioBooks");
  }

  get(id) {
    return http.get(`/User/Get/${id}`);
  }

  create(data) {
    
    var formData = new FormData();
    formData.append("audiobook", data.audiobook);
    formData.append("audiobookName", data.audiobookName);
    return http.post("/AudioBooks", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'

      },
    });
  }
  
}

export default new FileDAS();
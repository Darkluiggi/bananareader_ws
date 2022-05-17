import http from "../http-common";
import { CREATE_LINK_MUTATION } from '../constants/graqhql'
// import { gql, useMutation } from '@apollo/client';

class AuthgraphQL {
  getAll() {
    return http.get("/User/GetList");
  }

  get(id) {
    return http.get(`/User/Get/${id}`);
  }

  create(data) {
    return http.post("/User/Create", data);
  }

  update(id, data) {
    return http.put(`/User/Edit/${id}`, data);
  }

  delete(id) {
    return http.delete(`/User/Delete/${id}`);
  }

  createLink (data) {
    /* eslint-disable no-debugger, no-console */
    debugger
    const { description, url } = data
    this.$apollo.mutate({
      mutation: CREATE_LINK_MUTATION,
      variables: {
        description,
        url
      }
    })
  }
  
}

export default new AuthgraphQL();
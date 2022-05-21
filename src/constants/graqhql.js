

import gql from 'graphql-tag'

export const CREATE_LINK_MUTATION = gql`
mutation CreateLinkMutation($description: String!, $url: String!) {
  createLink(
    description: $description,
    url: $url,
  ) {
    id
    url
    description
  }
}
`
export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`

export const CREATE_POST_MUTATION = gql`
      mutation (
        $input: CreatePostInput!
      ) {
        createPost(input: $input) {
          id
          title
          body
        }
      }
`

export const LOGIN_MUTATION = gql`
mutation ($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    ok
    usuario{
      nombre
      email
      role
    }
  }
}
`

export const REGISTER_MUTATION = gql`
mutation ($email: String!, $password: String!, $user_id: Int!, $nombre: String!, $role: String!) {
  register(email: $email, password: $password, user_id: $user_id, nombre: $nombre, role :$role) {    
    ok
    usuario{
      nombre
      email
      role
      _id
      user_id
    }
  }
}
`
export const GET_AUTOR_QUERY = gql`
query  {
  getAutors() {
    name
  }
}
`
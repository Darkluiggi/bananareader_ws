

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
export const GET_AUTOR_QUERY = gql`
query  {
  getAutors(userId: 1) {
    name
  }
}
`
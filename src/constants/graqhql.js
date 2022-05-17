

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
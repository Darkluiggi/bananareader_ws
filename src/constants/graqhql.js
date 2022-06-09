

import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
mutation ($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    ok
    usuario{
      nombre
      email
      role
      user_id
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
export const CREATE_READING_MUTATION = gql`
mutation ($user: Int!, $storage: Int!, $duration: String!, $chapters: Int!, $language: Int!, $narrators: [Int!], $book: Int!) {
  createReading(user: $user, storage: $storage, duration: $duration, chapters: $chapters, language :$language, narrators: $narrators, book: $book) {    
    id_reading
		user
    storage
    duration
    chapters
  }
}
`


export const GET_AUTORS_QUERY = gql`
query  {
  getAutors {
    name
    surname
    id_author
  }
}
`
export const GET_GENRES_QUERY = gql`
query  {
  getGenres {
    name
    id_genre
  }
}
`
export const GET_BOOKS_QUERY = gql`
query  {
  getBooks {
    title
    sinopsis
    year
    id_book
    authors{
      name
      surname
    }
  }
}
`
export const GET_NARRATORS_QUERY = gql`
query  {
  getNarrators {
    name
    surname
    id_narrator
  }
}
`
export const GET_LANGUAGES_QUERY = gql`
query  {
  getLanguages {
    id_language
    name
  }
}
`

export const GET_AUDIOS_QUERY = gql`
query  {
  getAudio {
    id
    path
  }
}
`

export const GET_READINGS_QUERY = gql`
query  {
  getReadings {
    id_reading
    user
    storage
    duration
    chapters
  }
}
`

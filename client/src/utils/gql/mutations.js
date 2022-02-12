import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    _id
    username
    email
  }
}
`;

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email1
    }
  }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($id: ID!, $bookToSave: BookInput!) {
  saveBook(_id: $id, bookToSave: $bookToSave) {
    _id
    savedBooks {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($id: ID!, $bookId: String!) {
  deleteBook(_id: $id, bookId: $bookId) {
    _id
    username
    email
    savedBooks {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;
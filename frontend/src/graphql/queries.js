import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

/*
export const SIGNUP_USER = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;
*/


export const SIGNUP_QUERY = gql`
  mutation Signup($authData: AuthInput!) {
    signup(authData: $authData) {
      token
    }
  }
`;

export const LOGIN_QUERY = gql`
  mutation Login($authData: AuthInput!) {
    login(authData: $authData) {
      token
    }
  }
`;

/*
export const GET_USERS = gql`
  query Login($authData: AuthInput!) {
    login(authData: $authData) {
      token
    }
  }
`;
*/

export const GET_USERNAMES = gql`
  query GetUsernames {
    getUsers {
      username
    }
  }
`;


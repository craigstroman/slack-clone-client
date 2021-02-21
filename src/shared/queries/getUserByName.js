import gql from 'graphql-tag';

const userQuery = gql`
  query getUserByName($username: String!) {
    getUserByName(username: $username) {
      id
      uuid
      firstName
      lastName
      phoneNumber
      username
      email
    }
  }
`;

export default userQuery;

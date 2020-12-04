import gql from 'graphql-tag';

const meQuery = gql`
  query meQuery {
    me {
      id
      uuid
      firstName
      lastName
      phoneNumber
      username
      email
      teams {
        id
        uuid
        name
        admin
        directMessageMembers {
          id
          uuid
          username
        }
        channels {
          id
          uuid
          name
        }
        teamMembers {
          id
          uuid
          username
        }
      }
    }
  }
`;

export default meQuery;

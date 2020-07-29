/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getusers = /* GraphQL */ `
  query Getusers($userid: String!, $username: String!) {
    getusers(userid: $userid, username: $username) {
      userid
      username
      podcasturl
      signindate
      lastlogin
      authid
    }
  }
`;
export const listusers = /* GraphQL */ `
  query Listusers(
    $filter: TableusersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listusers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        userid
        username
        podcasturl
        signindate
        lastlogin
        authid
      }
      nextToken
    }
  }
`;

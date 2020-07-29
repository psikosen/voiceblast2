/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateusers = /* GraphQL */ `
  subscription OnCreateusers(
    $userid: String
    $username: String
    $podcasturl: String
    $signindate: String
    $lastlogin: String
  ) {
    onCreateusers(
      userid: $userid
      username: $username
      podcasturl: $podcasturl
      signindate: $signindate
      lastlogin: $lastlogin
    ) {
      userid
      username
      podcasturl
      signindate
      lastlogin
      authid
    }
  }
`;
export const onUpdateusers = /* GraphQL */ `
  subscription OnUpdateusers(
    $userid: String
    $username: String
    $podcasturl: String
    $signindate: String
    $lastlogin: String
  ) {
    onUpdateusers(
      userid: $userid
      username: $username
      podcasturl: $podcasturl
      signindate: $signindate
      lastlogin: $lastlogin
    ) {
      userid
      username
      podcasturl
      signindate
      lastlogin
      authid
    }
  }
`;
export const onDeleteusers = /* GraphQL */ `
  subscription OnDeleteusers(
    $userid: String
    $username: String
    $podcasturl: String
    $signindate: String
    $lastlogin: String
  ) {
    onDeleteusers(
      userid: $userid
      username: $username
      podcasturl: $podcasturl
      signindate: $signindate
      lastlogin: $lastlogin
    ) {
      userid
      username
      podcasturl
      signindate
      lastlogin
      authid
    }
  }
`;

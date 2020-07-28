/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getusers = /* GraphQL */ `
  query Getusers {
    getusers {
      id
      username
      url
    }
  }
`;
export const getVoiceblasts = /* GraphQL */ `
  query GetVoiceblasts($id: ID!) {
    getVoiceblasts(id: $id) {
      id
      voicetitles
      voiceblastpath
      viewed
    }
  }
`;
export const listVoiceblasts = /* GraphQL */ `
  query ListVoiceblasts(
    $filter: TableVoiceblastsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVoiceblasts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        voicetitles
        voiceblastpath
        viewed
      }
      nextToken
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      username
      url
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: TableUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        url
      }
      nextToken
    }
  }
`;

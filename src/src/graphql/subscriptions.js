/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVoiceblasts = /* GraphQL */ `
  subscription OnCreateVoiceblasts(
    $id: ID
    $voicetitles: String
    $voiceblastpath: String
    $viewed: Int
  ) {
    onCreateVoiceblasts(
      id: $id
      voicetitles: $voicetitles
      voiceblastpath: $voiceblastpath
      viewed: $viewed
    ) {
      id
      voicetitles
      voiceblastpath
      viewed
    }
  }
`;
export const onUpdateVoiceblasts = /* GraphQL */ `
  subscription OnUpdateVoiceblasts(
    $id: ID
    $voicetitles: String
    $voiceblastpath: String
    $viewed: Int
  ) {
    onUpdateVoiceblasts(
      id: $id
      voicetitles: $voicetitles
      voiceblastpath: $voiceblastpath
      viewed: $viewed
    ) {
      id
      voicetitles
      voiceblastpath
      viewed
    }
  }
`;
export const onDeleteVoiceblasts = /* GraphQL */ `
  subscription OnDeleteVoiceblasts(
    $id: ID
    $voicetitles: String
    $voiceblastpath: String
    $viewed: Int
  ) {
    onDeleteVoiceblasts(
      id: $id
      voicetitles: $voicetitles
      voiceblastpath: $voiceblastpath
      viewed: $viewed
    ) {
      id
      voicetitles
      voiceblastpath
      viewed
    }
  }
`;
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($id: ID, $username: String, $url: String) {
    onCreateUsers(id: $id, username: $username, url: $url) {
      id
      username
      url
    }
  }
`;
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers($id: ID, $username: String, $url: String) {
    onUpdateUsers(id: $id, username: $username, url: $url) {
      id
      username
      url
    }
  }
`;
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers($id: ID, $username: String, $url: String) {
    onDeleteUsers(id: $id, username: $username, url: $url) {
      id
      username
      url
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVbuser = /* GraphQL */ `
  query GetVbuser($vbuid: String!) {
    getVbuser(vbuid: $vbuid) {
      vbuid
      vbuusername
      vbufirstname
      vbulastname
      vbuemail
      vbuurl
      vbubio
      vbuimg
      vbulastlogin
      vbusignupdate
    }
  }
`;
export const listVbusers = /* GraphQL */ `
  query ListVbusers(
    $filter: TableVbuserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVbusers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        vbuid
        vbuusername
        vbufirstname
        vbulastname
        vbuemail
        vbuurl
        vbubio
        vbuimg
        vbulastlogin
        vbusignupdate
      }
      nextToken
    }
  }
`;
export const getVoiceblasts = /* GraphQL */ `
  query GetVoiceblasts($vbuserid: String!) {
    getVoiceblasts(vbuserid: $vbuserid) {
      vbid
      vbtitle
      vbaudpath
      vbuserid
      vbviews
      vbdatecreated
      vbuimg
      vbuusername
      vbufullname
      vbuurl
      vbubio
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
        vbid
        vbtitle
        vbaudpath
        vbuserid
        vbviews
        vbdatecreated
        vbuimg
        vbuusername
        vbufullname
        vbuurl
        vbubio
      }
      nextToken
    }
  }
`;
export const getFollower = /* GraphQL */ `
  query GetFollower($vbuserid: String!) {
    getFollower(vbuserid: $vbuserid) {
      vbuserid
      vbuserfollowerid
    }
  }
`;
export const listFollowers = /* GraphQL */ `
  query ListFollowers(
    $filter: TableFollowerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        vbuserid
        vbuserfollowerid
      }
      nextToken
    }
  }
`;
export const getFollowing = /* GraphQL */ `
  query GetFollowing($vbuserid: String!) {
    getFollowing(vbuserid: $vbuserid) {
      vbuserid
      vbuserfollowerid
    }
  }
`;
export const listFollowings = /* GraphQL */ `
  query ListFollowings(
    $filter: TableFollowingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        vbuserid
        vbuserfollowerid
      }
      nextToken
    }
  }
`;

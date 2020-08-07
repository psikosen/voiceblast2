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
      vbaudpath
      vbuserid
      vbviews
      vbdatecreated
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
        vbaudpath
        vbuserid
        vbviews
        vbdatecreated
      }
      nextToken
    }
  }
`;

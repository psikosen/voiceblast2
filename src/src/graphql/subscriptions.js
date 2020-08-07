/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVbuser = /* GraphQL */ `
  subscription OnCreateVbuser(
    $vbuid: String
    $vbuusername: String
    $vbufirstname: String
    $vbulastname: String
    $vbuemail: String
    $vbuurl: String
    $vbuimg: String
    $vbulastlogin: AWSDateTime
    $vbusignupdate: AWSDateTime
  ) {
    onCreateVbuser(
      vbuid: $vbuid
      vbuusername: $vbuusername
      vbufirstname: $vbufirstname
      vbulastname: $vbulastname
      vbuemail: $vbuemail
      vbuurl: $vbuurl
      vbuimg: $vbuimg
      vbulastlogin: $vbulastlogin
      vbusignupdate: $vbusignupdate
    ) {
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
export const onUpdateVbuser = /* GraphQL */ `
  subscription OnUpdateVbuser(
    $vbuid: String
    $vbuusername: String
    $vbufirstname: String
    $vbulastname: String
    $vbuemail: String
    $vbuurl: String
    $vbuimg: String
    $vbulastlogin: AWSDateTime
    $vbusignupdate: AWSDateTime
  ) {
    onUpdateVbuser(
      vbuid: $vbuid
      vbuusername: $vbuusername
      vbufirstname: $vbufirstname
      vbulastname: $vbulastname
      vbuemail: $vbuemail
      vbuurl: $vbuurl
      vbuimg: $vbuimg
      vbulastlogin: $vbulastlogin
      vbusignupdate: $vbusignupdate
    ) {
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
export const onDeleteVbuser = /* GraphQL */ `
  subscription OnDeleteVbuser(
    $vbuid: String
    $vbuusername: String
    $vbufirstname: String
    $vbulastname: String
    $vbuemail: String
    $vbuurl: String
    $vbuimg: String
    $vbulastlogin: AWSDateTime
    $vbusignupdate: AWSDateTime
  ) {
    onDeleteVbuser(
      vbuid: $vbuid
      vbuusername: $vbuusername
      vbufirstname: $vbufirstname
      vbulastname: $vbulastname
      vbuemail: $vbuemail
      vbuurl: $vbuurl
      vbuimg: $vbuimg
      vbulastlogin: $vbulastlogin
      vbusignupdate: $vbusignupdate
    ) {
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
export const onCreateVoiceblasts = /* GraphQL */ `
  subscription OnCreateVoiceblasts(
    $vbid: String
    $vbaudpath: String
    $vbuserid: String
    $vbviews: Int
    $vbdatecreated: AWSDateTime
  ) {
    onCreateVoiceblasts(
      vbid: $vbid
      vbaudpath: $vbaudpath
      vbuserid: $vbuserid
      vbviews: $vbviews
      vbdatecreated: $vbdatecreated
    ) {
      vbid
      vbaudpath
      vbuserid
      vbviews
      vbdatecreated
    }
  }
`;
export const onDeleteVoiceblasts = /* GraphQL */ `
  subscription OnDeleteVoiceblasts(
    $vbid: String
    $vbaudpath: String
    $vbuserid: String
    $vbviews: Int
    $vbdatecreated: AWSDateTime
  ) {
    onDeleteVoiceblasts(
      vbid: $vbid
      vbaudpath: $vbaudpath
      vbuserid: $vbuserid
      vbviews: $vbviews
      vbdatecreated: $vbdatecreated
    ) {
      vbid
      vbaudpath
      vbuserid
      vbviews
      vbdatecreated
    }
  }
`;

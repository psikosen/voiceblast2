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
    $vbubio: String
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
      vbubio: $vbubio
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
      vbubio
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
    $vbubio: String
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
      vbubio: $vbubio
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
      vbubio
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
    $vbubio: String
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
      vbubio: $vbubio
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
      vbubio
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
    $vbtitle: String
    $vbuserid: String
    $vbviews: Int
    $vbdatecreated: AWSDateTime
  ) {
    onCreateVoiceblasts(
      vbid: $vbid
      vbaudpath: $vbaudpath
      vbtitle: $vbtitle
      vbuserid: $vbuserid
      vbviews: $vbviews
      vbdatecreated: $vbdatecreated
    ) {
      vbid
      vbtitle
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
    $vbtitle: String
    $vbaudpath: String
    $vbuserid: String
    $vbviews: Int
    $vbdatecreated: AWSDateTime
  ) {
    onDeleteVoiceblasts(
      vbid: $vbid
      vbtitle: $vbtitle
      vbaudpath: $vbaudpath
      vbuserid: $vbuserid
      vbviews: $vbviews
      vbdatecreated: $vbdatecreated
    ) {
      vbid
      vbtitle
      vbaudpath
      vbuserid
      vbviews
      vbdatecreated
    }
  }
`;
export const onCreateFollower = /* GraphQL */ `
  subscription OnCreateFollower($vbuserid: String, $vbuserfollowerid: String) {
    onCreateFollower(vbuserid: $vbuserid, vbuserfollowerid: $vbuserfollowerid) {
      vbuserid
      vbuserfollowerid
    }
  }
`;
export const onUpdateFollower = /* GraphQL */ `
  subscription OnUpdateFollower($vbuserid: String, $vbuserfollowerid: String) {
    onUpdateFollower(vbuserid: $vbuserid, vbuserfollowerid: $vbuserfollowerid) {
      vbuserid
      vbuserfollowerid
    }
  }
`;
export const onDeleteFollower = /* GraphQL */ `
  subscription OnDeleteFollower($vbuserid: String, $vbuserfollowerid: String) {
    onDeleteFollower(vbuserid: $vbuserid, vbuserfollowerid: $vbuserfollowerid) {
      vbuserid
      vbuserfollowerid
    }
  }
`;
export const onCreateFollowing = /* GraphQL */ `
  subscription OnCreateFollowing($vbuserid: String, $vbuserfollowerid: String) {
    onCreateFollowing(
      vbuserid: $vbuserid
      vbuserfollowerid: $vbuserfollowerid
    ) {
      vbuserid
      vbuserfollowerid
    }
  }
`;
export const onUpdateFollowing = /* GraphQL */ `
  subscription OnUpdateFollowing($vbuserid: String, $vbuserfollowerid: String) {
    onUpdateFollowing(
      vbuserid: $vbuserid
      vbuserfollowerid: $vbuserfollowerid
    ) {
      vbuserid
      vbuserfollowerid
    }
  }
`;
export const onDeleteFollowing = /* GraphQL */ `
  subscription OnDeleteFollowing($vbuserid: String, $vbuserfollowerid: String) {
    onDeleteFollowing(
      vbuserid: $vbuserid
      vbuserfollowerid: $vbuserfollowerid
    ) {
      vbuserid
      vbuserfollowerid
    }
  }
`;

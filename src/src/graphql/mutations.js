/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVbuser = /* GraphQL */ `
  mutation CreateVbuser($input: CreateVbuserInput!) {
    createVbuser(input: $input) {
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
export const updateVbuser = /* GraphQL */ `
  mutation UpdateVbuser($input: UpdateVbuserInput!) {
    updateVbuser(input: $input) {
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
export const updateVbuserimg = /* GraphQL */ `
  mutation UpdateVbuserimg($input: UpdateVbuserImg!) {
    updateVbuserimg(input: $input) {
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
export const deleteVbuser = /* GraphQL */ `
  mutation DeleteVbuser($input: DeleteVbuserInput!) {
    deleteVbuser(input: $input) {
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
export const createVoiceblasts = /* GraphQL */ `
  mutation CreateVoiceblasts($input: CreateVoiceblastsInput!) {
    createVoiceblasts(input: $input) {
      vbid
      vbtitle
      vbaudpath
      vbuserid
      vbviews
      vbdatecreated
    }
  }
`;
export const updateVoiceblasts = /* GraphQL */ `
  mutation UpdateVoiceblasts($input: UpdateVoiceblastsInput!) {
    updateVoiceblasts(input: $input) {
      vbid
      vbtitle
      vbaudpath
      vbuserid
      vbviews
      vbdatecreated
    }
  }
`;
export const updateVoiceblastsTitle = /* GraphQL */ `
  mutation UpdateVoiceblastsTitle($input: UpdateVoiceblastsTitleInput!) {
    updateVoiceblastsTitle(input: $input) {
      vbid
      vbtitle
      vbaudpath
      vbuserid
      vbviews
      vbdatecreated
    }
  }
`;
export const deleteVoiceblasts = /* GraphQL */ `
  mutation DeleteVoiceblasts($input: DeleteVoiceblastsInput!) {
    deleteVoiceblasts(input: $input) {
      vbid
      vbtitle
      vbaudpath
      vbuserid
      vbviews
      vbdatecreated
    }
  }
`;
export const updateView = /* GraphQL */ `
  mutation UpdateView($vbid: String!, $vbviews: Int) {
    updateView(vbid: $vbid, vbviews: $vbviews) {
      vbid
      vbtitle
      vbaudpath
      vbuserid
      vbviews
      vbdatecreated
    }
  }
`;
export const createFollower = /* GraphQL */ `
  mutation CreateFollower($input: CreateFollowerInput!) {
    createFollower(input: $input) {
      vbuserid
      vbuserfollowerid
    }
  }
`;
export const updateFollower = /* GraphQL */ `
  mutation UpdateFollower($input: UpdateFollowerInput!) {
    updateFollower(input: $input) {
      vbuserid
      vbuserfollowerid
    }
  }
`;
export const deleteFollower = /* GraphQL */ `
  mutation DeleteFollower($input: DeleteFollowerInput!) {
    deleteFollower(input: $input) {
      vbuserid
      vbuserfollowerid
    }
  }
`;
export const createFollowing = /* GraphQL */ `
  mutation CreateFollowing($input: CreateFollowingInput!) {
    createFollowing(input: $input) {
      vbuserid
      vbuserfollowerid
    }
  }
`;
export const updateFollowing = /* GraphQL */ `
  mutation UpdateFollowing($input: UpdateFollowingInput!) {
    updateFollowing(input: $input) {
      vbuserid
      vbuserfollowerid
    }
  }
`;
export const deleteFollowing = /* GraphQL */ `
  mutation DeleteFollowing($input: DeleteFollowingInput!) {
    deleteFollowing(input: $input) {
      vbuserid
      vbuserfollowerid
    }
  }
`;

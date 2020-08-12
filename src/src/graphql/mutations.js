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
      vbaudpath
      vbuserid
      vbviews
      vbdatecreated
    }
  }
`;

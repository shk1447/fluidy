import axios from 'axios'

async function spaceList() {
  try {
    return await axios.get('/space/list')      
  } catch (error) {      
    console.log('%c' +  `${error}` , 'background: #222; color: #bada55')
  }
}

async function createSpace(spaceName) {
  try {
    return await axios.post('/space/create', {
      space_name: spaceName
    })
  } catch (error){
    console.log('%c' +  `${error}` , 'background: #222; color: #bada55')
  }
}

async function removeSpace(spaceID){
  try {
    return await axios.post('/space/delete', {
      space_guid: spaceID
    })
  } catch (error){
    console.log('%c' +  `${error}` , 'background: #222; color: #bada55')
  }
}

async function loadSpace(spaceID){
  try {
    return await axios.get('/space/load', {
      params : {
        space_guid: spaceID
      }
    })
  } catch (error){
    console.log('%c' +  `${error}` , 'background: #222; color: #bada55')
  }
}

async function inviteUser(invitationInfo){
  try {
    return await axios.post('/space/user/add', {
      space_guid: invitationInfo.space_guid,
      email: invitationInfo.email,
      role: invitationInfo.role
    })
  } catch (error){
    console.log('%c' +  `${error}` , 'background: #222; color: #bada55')
  }
}

async function loadSpaceUser(spaceID){
  try {
    return await axios.get('/space/user', {
      params : {
        space_guid: spaceID
      }
    })
  } catch (error){
    console.log('%c' +  `${error}` , 'background: #222; color: #bada55')
  }
}
export {spaceList, createSpace, removeSpace, loadSpace, inviteUser, loadSpaceUser}
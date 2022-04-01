import axios from 'axios'

async function createUser(signupForm) {
  try {
    return await axios.post('/user/create', signupForm, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })      
  } catch (error) {      
    console.log('%c' +  `${error}` , 'background: #222; color: #bada55')
  }
}

async function login(loginForm){
  try {
    return await axios.get('/auth/local', {
      params: {
        email: loginForm.email,
        pwd: loginForm.pwd
      }
    })
  }catch (error){
    console.log('%c' +  `${error}` , 'background: #222; color: #bada55')
  }
}

async function authCheck(){
  try {
    return await axios.get('/auth/check');
  }catch (error){
    console.log('%c' +  `${error}` , 'background: #222; color: #bada55')
  }
}

async function updateUser(updateForm){
  return await axios.post('/user/update', updateForm, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })      
}

async function getUser(){
  try {
    return await axios.get('/user/info');
  }catch (error){
    console.log('%c' +  `${error}` , 'background: #222; color: #bada55')
  }
}

export {createUser, login, authCheck, updateUser, getUser};
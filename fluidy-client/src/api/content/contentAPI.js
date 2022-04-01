import axios from 'axios'

async function loadContent(params) {
  try {
    var url = '/content/load';
    if (params) {
      url += "?" + new URLSearchParams(params).toString();
    }
    return await axios.get(url)
  } catch (error) {
    console.log('%c' + `${error}`, 'background: #222; color: #bada55')
  }
}

async function contentOptions(params) {
  try {
    return await axios.get('/content/options')
  } catch (error) {
    console.log('%c' + `${error}`, 'background: #222; color: #bada55')
  }
}

async function createContent(params) {
  try {
    return await axios.post('/content/create', params)
  } catch (error) {
    console.log('%c' + `${error}`, 'background: #222; color: #bada55')
  }
}

async function removeContent(contentID) {
  try {
    return await axios.post('/content/delete', {
      content_guid: contentID
    })
  } catch (error) {
    console.log('%c' + `${error}`, 'background: #222; color: #bada55')
  }
}

async function insertData(params) {
  try {
    console.log(params);
    return await axios.post('/content/data/add', params)
  } catch (error) {
    console.log('%c' + `${error}`, 'background: #222; color: #bada55')
  }
}

async function updateData(params) {
  try {
    return await axios.post('/content/data/update', params)
  } catch (error) {
    console.log('%c' + `${error}`, 'background: #222; color: #bada55')
  }
}

async function removeData(params) {
  try {
    return await axios.post('/content/data/delete', params)
  } catch (error) {
    console.log('%c' + `${error}`, 'background: #222; color: #bada55')
  }
}

async function addContent(params){
  try {
    return await axios.post('/content/data/add', params)
  } catch (error) {
    console.log('%c' + `${error}`, 'background: #222; color: #bada55')
  }
}
export { loadContent, contentOptions, createContent, removeContent, insertData, updateData, removeData, addContent }
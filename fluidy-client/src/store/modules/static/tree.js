import {loadSpace} from '../../../api/space/spaceAPI'

const state = () => ({
  guid: null,
  name : null,
  children : [],
})

// getters
const getters = {
  getTreeData: (state, getters, rootState) => {
    return state.FlowsAndDocuments;
  }
}

// actions
const actions = {
  async loadTreeData ({ commit, state }, spaceID) {
    const response = await loadSpace(spaceID);
    console.log(response);
    if(response.status === 200){
      const guid = Object.keys(response.data.result)[0]      
      commit('setTreeData', {
        guid : guid,
        name : response.data.result[guid].name,
        children : response.data.result[guid].children
      })     
       
    }
  }
}

// mutations
const mutations = {
  setTreeData (state, treeData) {
    state.guid = treeData.guid;
    state.name = treeData.name;
    state.children = treeData.children;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
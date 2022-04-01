const state = () => ({
  contents: []
})

// getters
const getters = {
  getContents: (state, getters, rootState) => {
    return state.contents
  }
}

// actions
const actions = {
  /***
   * {
   *  id : string
   *  type : 'table' || 'flow'
   * }
   * 
   */
  add({ commit, state }, contentInfo) {
    commit('addContent', contentInfo)
  },
  delete({ commit, state }, contentID) {
    commit('deleteContent', contentID)
  },
  clear({ commit, state }, contentID) {
    commit('clearContent', contentID)
  },
}

// mutations
const mutations = {
  addContent(state, contentInfo) {
    const filterRes = state.contents.filter((content)=> contentInfo.content_guid === content.content_guid);
    if(!filterRes.length) state.contents.push(contentInfo);
    else {

    }    
  },
  deleteContent(state, contentID) {
    state.contents = [...state.contents.filter((d) => d.content_guid !== contentID)]
  },
  clearContent(state) {
    state.contents = [];
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
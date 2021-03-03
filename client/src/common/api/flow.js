import http from "../utils/Http.js";

// machine api
export default {
  setEdges: function(params) {
    var url = "/flow/edges";
    return http.post(url, params).then(function(res) {
      return res;
    });
  },
  setNodes: function(params) {
    var url = "/flow/nodes";
    return http.post(url, params).then(function(res) {
      return res;
    });
  },
  getEdges: function() {
    var url = "/flow/edges";
    return http.get(url).then(function(res) {
      return res;
    });
  },
  getNodes:function() {
    var url = "/flow/nodes";
    return http.get(url).then(function(res) {
      return res;
    });
  }
};

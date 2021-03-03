import http from "../utils/Http.js";

// machine api
export default {
  signin: function(params) {
    var url = "/user/signin";
    return http.post(url, params).then(function(res) {
      return res;
    });
  },
  signup: function(params) {
    var url = "/user/signup";
    return http.post(url, params).then(function(res) {
      return res;
    });
  },
  check: function() {
    var url = "/user/check";
    return http.get(url).then(function(res) {
      return res;
    });
  },
  logout:function() {
    var url = "/user/logout";
    return http.get(url).then(function(res) {
      return res;
    });
  }
};

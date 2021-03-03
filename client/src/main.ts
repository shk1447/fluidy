import Vue from "vue";
import vuetify from "./plugin/vuetify"
import router from "./router";

import Notification from "element-ui/lib/notification";
import Message from "element-ui/lib/message";
import Loading from "element-ui/lib/loading";
import MessageBox from "element-ui/lib/message-box";

import "element-ui/lib/theme-chalk/icon.css";
import "element-ui/lib/theme-chalk/message.css";
import "element-ui/lib/theme-chalk/notification.css";
import "element-ui/lib/theme-chalk/loading.css";
import "element-ui/lib/theme-chalk/spinner.css";
import "element-ui/lib/theme-chalk/message-box.css";

Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$confirm = MessageBox.confirm;

import common from "./common";
Vue.prototype.$common = common;

Vue.mixin({
  data() {
    return {
      mrx_store:common.store.all
    }
  },
  methods: {
    // 컴포넌트가 관심을 가지는 이벤트 리스트 정의
    notifications: function() {
      /*
            ex] 아래와 같이 사용
            [{path:'app.loading', callback : function() { }}]
            */
      return [];
    }
  },
  created: function() {
    var handlers = this.notifications();
    handlers.forEach(function(handle, k) {
      common.store.onProperty(handle.path, handle.callback);
    });
  },
  destroyed: function() {
    var handlers = this.notifications();
    handlers.forEach(function(handle, k) {
      common.store.offProperty(handle.path, handle.callback);
    });
  },
});


import App from "./App.vue";
new Vue({
  el: '#app',
  router,
  vuetify,
  components: { App },
  template: "<App/>"
})
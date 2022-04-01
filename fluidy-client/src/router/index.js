// SPA route에 대한 관리 코드
import Vue from "vue";
import Router from "vue-router";
import {authCheck} from '../api/user/userAPI'
Vue.use(Router);
import MainComponent from "../views/MainComponent.vue";
import LoginComponent from "../views/LoginComponent.vue";
export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginComponent,
    },
    {
      path: "/main",
      name: "viewer",
      component: MainComponent,
      beforeEnter: async (to, from, next) => {
        try {
          const response = await authCheck();
          if(response.status === 200){
            next()
          }else{
            next({ path: '/' })
          }
        }catch (error){
          next({ path: '/' })
        }        
      }
    }
  ],
});

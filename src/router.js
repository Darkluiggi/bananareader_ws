import Vue from "vue";
import Router from "vue-router";
import Home from "./components/core/Home"


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/",
      alias: "/home",
      name: "Home2",
      props: {reload: false},
      component: Home
    },
    {
      path: "/Users",
      name: "users",
      component: () => import("./components/Users/Index")
    },    
    {
      path: "/Registration",
      name: "Registration",
      component: () => import("./components/core/Registration")
    }, 
    {
      path: "/Login",
      name: "Login",
      component: () => import("./components/core/Login")
    }, 
  ]
});

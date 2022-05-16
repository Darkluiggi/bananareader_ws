import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/core/Home-Component"   
import Login from "./components/core/Login-Component"

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: Home
  },   
  {
    path: "/Login",
    name: "Login",
    component: Login
  }, 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
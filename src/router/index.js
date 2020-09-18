import Vue from 'vue';
import VueRouter from 'vue-router'
import Cat from "../views/cat/Cat";

const Home = () => import( "../views/home/Home");
const Category = () =>  import("../views/category/Category");
const Cat = () => import( "../views/cat/Cat");
const Profile = () => import("../views/profile/Profile");

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cat',
    component: Cat
  },
  {
    path: '/profile',
    component: Profile
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router


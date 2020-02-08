import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const List = () => import("../views/List.vue");

const routes = [
  { path: "/", component: List, props: true },
  { path: "/page", component: List, props: true },
  { path: "/page/:page(\\d+)", component: List, props: true },
  { path: "/tag/:tag", component: List, props: true },
  { path: "/tag/:tag/:page(\\d+)", component: List, props: true },
  { path: "/search/:query", component: List, props: true },
  { path: "/search/:query/:page(\\d+)", component: List, props: true },
  {
    path: "/post/:id(\\d+)",
    component: () => import("../views/Article.vue"),
    props: true
  },
  { path: "/*", component: () => import("../views/Error404.vue") }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

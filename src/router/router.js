import HomePage from "../views/HomePage.vue";
import FoodPage from "../views/FoodPage.vue";
import MealsPage from "../views/MealsPage.vue";
import NotFound from "../views/NotFound.vue";
import LoginPage from "../views/LoginPage.vue";
import authCheck from "./middlewares/authCheck";
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
const routeInfos = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/layouts/MainLayout"),
    children: [
      {
        path: "/",
        component: HomePage,
        name: "home",
      },
      {
        path: "/meals",
        component: MealsPage,
        name: "meal",
        meta: {
          middleware: [authCheck],
        },
      },
      {
        path: "/foodPage/:id",
        component: FoodPage,
        name: "food",
        meta: {
          middleware: [authCheck],
        },
      },
      {
        path: "/login",
        component: LoginPage,
        name: "login",
      },
    ],
  },
  {
    path: "/error",
    component: () => import("@/layouts/ErrorLayout"),
    name: "error",
    children: [
      {
        path: "/404",
        component: NotFound,
        name: "404",
        meta: {
          layout: "ErrorLayout",
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404",
  },
];

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === "production" ? "/foodapp/" : "/"
  ),
  //

  routes: routeInfos,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store,
  };
  return middleware[0]({
    ...context,
  });
});
export default router;

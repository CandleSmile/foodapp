import HomePage from "../views/HomePage.vue";
import FoodPage from "../views/FoodPage.vue";
import MealsPage from "../views/MealsPage.vue";
import CartPage from "../views/CartPage.vue";
import NotFound from "../views/NotFound.vue";
import LoginPage from "../views/LoginPage.vue";
import UserOrderHistoryPage from "../views/UserOrderHistoryPage.vue";

import RegistrationPage from "../views/RegistrationPage.vue";
import authCheck from "./middlewares/authCheck";
import loginTokensCheck from "./middlewares/loginTokensCheck";
import middlewarePipeline from "./middlewares/middlewarePipeline";
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
        meta: {
          middleware: [loginTokensCheck],
        },
      },
      {
        path: "/meals",
        component: MealsPage,
        name: "meal",
        meta: {
          middleware: [loginTokensCheck],
        },
      },
      {
        path: "/foodPage/:id",
        component: FoodPage,
        name: "food",
        meta: {
          middleware: [loginTokensCheck],
        },
      },
      {
        path: "/cart",
        component: CartPage,
        name: "cart",
        meta: {
          middleware: [authCheck, loginTokensCheck],
        },
      },
      {
        path: "/orders",
        component: UserOrderHistoryPage,
        name: "orders",
        meta: {
          middleware: [authCheck, loginTokensCheck],
        },
      },
      {
        path: "/login",
        component: LoginPage,
        name: "login",
      },
      {
        path: "/register",
        component: RegistrationPage,
        name: "register",
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
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;

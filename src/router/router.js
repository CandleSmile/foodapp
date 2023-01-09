import HomePage from "../views/HomePage.vue";
import FoodPage from "../views/FoodPage.vue";
import MealsPage from "../views/MealsPage.vue";
import NotFound from "../views/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";

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
      },
      {
        path: "/foodPage/:id",
        component: FoodPage,
        name: "food",
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

export default router;

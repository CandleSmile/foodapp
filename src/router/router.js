import HomePage from "../views/HomePage.vue";
import FoodPage from "../views/FoodPage.vue";
import MealsPage from "../views/MealsPage.vue";
import NotFound from "../views/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";
import { loadLayoutMiddleware } from "@/router/middleware/loadLayout.middleware";
const routeInfos = [
  {
    path: "/",
    component: HomePage,
    name: "home",
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/meals",
    component: MealsPage,
    name: "meal",
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/foodPage/:id",
    component: FoodPage,
    name: "food",
    meta: {
      layout: "MainLayout",
    },
  },
  {
    path: "/404",
    component: NotFound,
    name: "404",
    meta: {
      layout: "ErrorLayout",
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404",
    meta: {
      layout: "ErrorLayout",
    },
  },
];

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === "production" ? "/foodapp/" : "/"
  ),
  //

  routes: routeInfos,
});

router.beforeEach(loadLayoutMiddleware);

export default router;

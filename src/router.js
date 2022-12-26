import HomePage from "./views/HomePage.vue";
import FoodPage from "./views/FoodPage.vue";
import MealsPage from "./views/MealsPage.vue";
import NotFound from "./views/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";
const routeInfos = [
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
  {
    path: "/404",
    component: NotFound,
    name: "404",
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404",
  },
];

const router = createRouter({
  history: createWebHistory(window.location.pathname),
  routes: routeInfos,
});

export default router;

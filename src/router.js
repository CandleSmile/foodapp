import HomePage from "./views/HomePage.vue";
import FoodPage from "./views/FoodPage.vue";
import NotFound from "./views/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";
const routeInfos = [
  {
    path: "/",
    component: HomePage,
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
  history: createWebHistory(),
  routes: routeInfos,
});

export default router;

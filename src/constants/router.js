import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/Pages/HomePage.vue";
import PlayersPage from "@/Pages/PlayersPage.vue";
import NotFoundPage from "@/Pages/NotFoundPage.vue";

const routes = [
  { path: "/home", component: HomePage },
  { path: "/players", component: PlayersPage },
  { path: "/:pathMatch(.*)*", component: NotFoundPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/Pages/HomePage.vue";
import PlayersPage from "@/Pages/PlayersPage.vue";
import TeamsPage from "@/Pages/TeamsPage.vue";
import NotFoundPage from "@/Pages/NotFoundPage.vue";
import MatchPage from "@/Pages/MatchPage.vue";

const routes = [
  { path: "/home", component: HomePage },
  { path: "/match", component: MatchPage },
  { path: "/players", component: PlayersPage },
  { path: "/teams", component: TeamsPage },
  { path: "/:pathMatch(.*)*", component: NotFoundPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

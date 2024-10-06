import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import PlayersPage from "@/pages/PlayersPage.vue";
import TeamsPage from "@/pages/TeamsPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import MatchPage from "@/pages/MatchPage.vue";

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

import { Router } from "express";
import { movieRoutes } from "../movie/route.movie";

const router = Router();

const modulesRoutes = [
  {
    path: "/movies",
    route: movieRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

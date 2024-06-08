import express from "express";
import { movieController } from "./controller.movie";
import { zodMovieSchema } from "./validation.movie";
import { zodMiddleware } from "../middleware/zodValidation";
const route = express.Router();

route.post(
  "/create-movie",
  zodMiddleware(zodMovieSchema),
  movieController.createMovieController
); //ok
route.get("/", movieController.getAllMovieController); //ok

route.get("/trending", movieController.getTrendingMovieController);

route.get("/new-release", movieController.getNewReleaseMovieController);

route.get("/search", movieController.searchMovieController); //ok

route.get("/:slug", movieController.getSlugMovieController); //ok

route.patch("/:movieId", movieController.updateMovieController);

route.delete("/:movieId", movieController.deletedMovieController);

export const movieRoutes = route;

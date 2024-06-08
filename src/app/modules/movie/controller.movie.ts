import { NextFunction, Request, RequestHandler, Response } from "express";
import { movieService } from "./service.movie";
import { catchAsync } from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import { MMovie } from "./model.movie";
import AppError from "../../error";

const createMovieController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await movieService.createMovieIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Movie created successfully.",
    data: result,
  });
});

const getAllMovieController = catchAsync(async (req, res) => {
  const result = await movieService.getAllMovieIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Movie fetched successfully.",
    data: result,
  });
});

const getSlugMovieController = catchAsync(async (req, res) => {
  const slug = req.params.slug;
  const result = await movieService.getSlugMovieIntoDB(slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Movie fetched successfully.",
    data: result,
  });
});

const getTrendingMovieController = catchAsync(async (req, res) => {
  const result = await movieService.trendingMovieIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trending movie fetch successfully.",
    data: result,
  });
});

const searchMovieController = catchAsync(async (req, res) => {
  const searchText = req.query.title as string;

  if (!searchText) {
    throw new AppError(httpStatus.BAD_REQUEST, "query is required");
  }

  const result = await movieService.searchMovieIntoDB(searchText);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Movie fetched successfully.",
    data: result,
  });
});

const getNewReleaseMovieController = catchAsync(async (req, res) => {
  const result = await movieService.newReleaseMovieIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Upcoming movie fetched successfully.",
    data: result,
  });
});

const updateMovieController = catchAsync(async (req, res) => {
  const movieId = req.params.movieId;
  const data = req.body;
  const result = await movieService.updateMovieIntoDB(movieId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Movie updated successfully.",
    data: result,
  });
});

const deletedMovieController = catchAsync(async (req, res) => {
  const movieId = req.params.movieId;
  const result = await movieService.deletedMovieIntoDB(movieId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Movie deleted successfully.",
    data: null,
  });
});

export const movieController = {
  createMovieController,
  getAllMovieController,
  getSlugMovieController,
  updateMovieController,
  deletedMovieController,
  searchMovieController,
  getTrendingMovieController,
  getNewReleaseMovieController,
};

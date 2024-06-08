import httpStatus from "http-status";
import AppError from "../../error";
import { TMovie } from "./interface.movie";
import { MMovie } from "./model.movie";

const createMovieIntoDB = async (payload: TMovie) => {
  const data = new MMovie(payload);
  data.createSlug();
  const result = await data.save();
  return result;
};

const getAllMovieIntoDB = async () => {
  const result = await MMovie.find();
  return result;
};

const getSlugMovieIntoDB = async (slug: string) => {
  const result = await MMovie.findOne({ slug });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Movie not founded");
  }
  return result;
};

const trendingMovieIntoDB = async () => {
  const result = await MMovie.find({ viewCount: { $gt: 500 } });
  return result;
};

const searchMovieIntoDB = async (title: string) => {
  // const result = await MMovie.aggregate([
  //   {
  //     $match: {
  //       $or: [
  //         { title: { $regex: title, $options: "i" } },
  //         { description: { $regex: title, $options: "i" } },
  //         { genre: { $regex: title, $options: "i" } },
  //       ],
  //     },
  //   },
  // ]);

  const regex = new RegExp(title, "i");
  const result = await MMovie.find({
    $or: [
      { title: regex },
      {
        description: regex,
      },
      {
        genre: regex,
      },
    ],
  });
  return result;
};

const newReleaseMovieIntoDB = async () => {
  const now = new Date();
  const sevenDays = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const result = await MMovie.find({
    releaseDate: {
      $gte: sevenDays,
      $lte: now,
    },
  });
  return result;
};

const updateMovieIntoDB = async (id: string, payload: TMovie) => {
  const result = await MMovie.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};
const deletedMovieIntoDB = async (id: string) => {
  const result = await MMovie.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const movieService = {
  createMovieIntoDB,
  getAllMovieIntoDB,
  getSlugMovieIntoDB,
  updateMovieIntoDB,
  deletedMovieIntoDB,
  searchMovieIntoDB,
  trendingMovieIntoDB,
  newReleaseMovieIntoDB,
};

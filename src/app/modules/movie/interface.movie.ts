import { Model } from "mongoose";
import { unknown } from "zod";

export type TReview = {
  email: string;
  rating: number;
  comment: string;
};

export type TMovie = {
  title: string;
  description: string;
  releaseDate: Date;
  genre: string;
  viewCount: number;
  totalRating: number;
  slug: string;
  isDeleted: boolean;
};

export type TSlug = {
  createSlug(): void;
};
export type TSlugModel = Model<TMovie, Record<string, never>, TSlug>;

import { format } from "date-fns";
import { Schema, model } from "mongoose";
import { TMovie, TReview, TSlug, TSlugModel } from "./interface.movie";
import slugify from "slugify";
import { any } from "zod";
import AppError from "../../error";
import httpStatus from "http-status";

const reviewSchema = new Schema<TReview>(
  {
    email: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const movieSchema = new Schema<TMovie, TSlugModel, TSlug>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

movieSchema.methods.createSlug = function createSlug() {
  const date = format(this.releaseDate, "dd-MM-yyyy");
  const slug = slugify(`${this.title} ${date}`, {
    lower: true,
    trim: true,
  });
  this.slug = slug;
};

export const MMovie = model<TMovie, TSlugModel>("movie", movieSchema);

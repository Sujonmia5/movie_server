import { z } from "zod";

// Define the Zod schema for TReview with custom error messages
const reviewSchema = z
  .object({
    slug: z.string(),
    email: z.string().email("Invalid email address"),
    rating: z
      .number()
      .min(0, "Rating must be at least 0")
      .max(10, "Rating must be at most 10"),
    comment: z.string({
      message: "Comment is required",
    }),
  })
  .strict();

// Define the Zod schema for TMovie with custom error messages
const zodMovieSchema = z
  .object({
    title: z.string({ message: "Title is required" }),
    description: z.string({ message: "Description is required" }),
    releaseDate: z.string({ message: "Release date is required" }),
    genre: z.string({ message: "Genre is required" }),
    viewCount: z.number().optional(),
    totalRating: z.number().optional(),
  })
  .strict();

// Export the schemas for use in your application
export { reviewSchema, zodMovieSchema };

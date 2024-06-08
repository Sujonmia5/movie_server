import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/modules/route";
import { globalError } from "./app/modules/middleware/globalErrorHandler";
import { notFounded } from "./app/modules/middleware/notFound";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// not founded
app.use(notFounded);
// global error
app.use(globalError);

export default app;

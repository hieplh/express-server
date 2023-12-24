import * as dotenv from "dotenv";
import path from "path";
import { logger } from "./logging/logger";
import { routes } from "./routes";
import { Express, NextFunction, Request, Response } from "express";
const cors = require("cors");
const express = require("express");
require("express-async-errors");

dotenv.config();

const app: Express = express();
app.routes = routes(app, {}, logger);
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../resources")));

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("Error | Global | ", err);

  if (!res.headersSent) {
    res.status(500).json({
      error: {
        statusCode: 500,
        message: err.message,
      },
    });
  }

  next(err);
});

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

process.on("unhandledRejection", (err) => {
  console.log("An error unhandledRejection: ", err);
});

process.on("uncaughtException", (err) => {
  console.log("An error uncaughtException: ", err);
});

process.on("rejectionHandled", (err) => {
  console.log("rejectionHandled: ", err);
});

export interface AuthenticatedRequest extends Request {
  user?: { [key: string]: any };
}
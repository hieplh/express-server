import { Express } from "express";
import { syncData } from "./sync-data/index";
import { streamingVideo } from "./streaming/video/index";
import { Logger } from "winston";

export const routes = (app: Express, db: any, logger: Logger) => {
  syncData(app, db, logger);
  streamingVideo(app, db, logger);
};

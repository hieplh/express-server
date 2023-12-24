import {Express, Response} from "express";
import { AuthenticatedRequest } from "index";
import fs from "fs";
import { Logger } from "winston";

export const streamingVideo = (app: Express, db: any, logger: Logger) => {
    app.get('/video', (req: AuthenticatedRequest, res: Response) => {
        const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range header");
        }
        const videoPath = 'PHÊ - Duy Mạnh [Official].mp4';
        const videoSize = fs.statSync('PHÊ - Duy Mạnh [Official].mp4').size;
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range?.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, headers);
    });
}
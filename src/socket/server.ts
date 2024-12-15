import express from "express";
import http from "http";

const dotenv = require("dotenv");
const app = express();
dotenv.config();

const server = http.createServer(app);

export { app, server };

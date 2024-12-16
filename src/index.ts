import express from "express";
import { app } from "./socket/server";

async function start() {
  app.use(express.json());

  app.use("/", (req: any, res: any, next: any) => {
    return res.status(200).json({ msg: "Hello from Shopping Server " });
  });

  try {
    app.use;
  } catch (error) {
    console.log("server error :", JSON.stringify(error));
  }
}

start();

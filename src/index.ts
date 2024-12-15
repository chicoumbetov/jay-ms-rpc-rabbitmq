import express from "express";
import { app } from "./socket/server";

async function start() {
  app.use(express.json());

  app.use("/", (req, res, next) => {
    return res.status(200).json({ msg: "Hello from Shopping Server " });
  });

  app.listen(8006, () => {
    console.log("Shopping Server is listening on http://localhost:8006");
  });
  try {
    app.use;
  } catch (error) {
    console.log("server error :", JSON.stringify(error));
  }
}

start();

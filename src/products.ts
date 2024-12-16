import express from "express";

const { app } = require("./socket/server");
const PORT = 9001;

app.use(express.json());

app.get("/products", (req: any, res: any) => {
  return res.json("Products Service");
});

app.get("/", (req: any, res: any) => {
  return res.json("Products Service");
});

app.listen(PORT, () => {
  console.log(`Products MS is listening on http://localhost:${PORT}`);
  // console.clear();
});

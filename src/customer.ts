import express from "express";
const { app } = require("./socket/server");
const PORT = 9000;

app.use(express.json());

app.get("/profile", (req: any, res: any) => {
  return res.json("Customer Service");
});

app.get("/", (req: any, res: any) => {
  return res.json("Customer Service");
});

app.listen(PORT, () => {
  console.log(`Customer MS is listening on http://localhost:${PORT}`);
  // console.clear();
});

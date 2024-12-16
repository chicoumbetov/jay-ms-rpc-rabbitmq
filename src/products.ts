import express from "express";

const { RPCObserver } = require("./rpc");
const { app } = require("./socket/server");
const PORT = 9001;

app.use(express.json());

const fakeProductResponse = {
  _id: "klsdjqfmlkd,sqfmljd",
  title: "iPhone",
  price: 600,
};

RPCObserver("PRODUCTS_RPC_QUEUE", fakeProductResponse);

app.get("/customer", (req: any, res: any) => {
  return res.json("Products Service");
});

app.get("/", (req: any, res: any) => {
  return res.json("Products Service");
});

app.listen(PORT, () => {
  console.log(`Products MS is listening on http://localhost:${PORT}`);
  // console.clear();
});

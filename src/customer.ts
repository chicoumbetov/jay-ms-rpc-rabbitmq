import express from "express";

const { RPCObserver } = require("./rpc");
const { app } = require("./socket/server");
const PORT = 9000;

app.use(express.json());

const fakeCustomerResponse = {
  _id: "klsdjqfmlkd,sqfmljd",
  name: "Mike",
  country: "Poland",
};

RPCObserver("CUSTOMER_RPC_QUEUE", fakeCustomerResponse);

app.get("/wishlist", (req: any, res: any) => {
  return res.json("Customer Service");
});

app.get("/", (req: any, res: any) => {
  return res.json("Customer Service");
});

app.listen(PORT, () => {
  console.log(`Customer MS is listening on http://localhost:${PORT}`);
  // console.clear();
});

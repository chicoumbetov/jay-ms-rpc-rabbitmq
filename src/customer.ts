import express from "express";

const { RPCObserver, RPCRequest } = require("./rpc");
const { app } = require("./socket/server");
const PORT = 9000;

app.use(express.json());

const fakeCustomerResponse = {
  _id: "yt686tu8763TYYR98734",
  name: "Mike",
  country: "Poland",
};

RPCObserver("CUSTOMER_RPC_QUEUE", fakeCustomerResponse);

app.get("/wishlist", async (req: any, res: any) => {
  const requestPayload = {
    productId: "123",
    customerId: "yt686tu8763TYYR98734",
  };
  try {
    const respData = await RPCRequest("PRODUCTS_RPC_QUEUE", requestPayload);
    console.log("Customer wishlist response data : ", respData);
    return res.status(200).json(respData);
  } catch (error) {
    console.log("Customer wishlist error: ", error);
    return res.status(500).json(error);
  }
});

app.get("/", (req: any, res: any) => {
  return res.json("Customer Service");
});

app.listen(PORT, () => {
  console.log(`Customer MS is listening on http://localhost:${PORT}`);
  console.clear();
});

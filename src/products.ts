import express from "express";

const { RPCObserver, RPCRequest } = require("./rpc");
const { app } = require("./socket/server");
const PORT = 9001;

app.use(express.json());

const fakeProductResponse = {
  _id: "yt686tu8763TYYR98734",
  title: "iPhone",
  price: 600,
};

RPCObserver("PRODUCTS_RPC_QUEUE", fakeProductResponse);

app.get("/customer", async (req: any, res: any) => {
  const requestPayload = {
    customerId: "yt686tu8763TYYR98734",
  };
  try {
    const respData = await RPCRequest("CUSTOMER_RPC_QUEUE", requestPayload);
    console.log("Products customer response data : ", respData);
    return res.status(200).json(respData);
  } catch (error) {
    console.log("Products customer error: ", error);
    return res.status(500).json(error);
  }
});

app.get("/", (req: any, res: any) => {
  return res.json("Products Service");
});

app.listen(PORT, () => {
  console.log(`Products MS is listening on http://localhost:${PORT}`);
  console.clear();
});

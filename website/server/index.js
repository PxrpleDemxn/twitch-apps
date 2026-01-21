const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const itemRoute = require("./routes/item");
const purchaseRoute = require("./routes/purchase");
const authRoute = require("./routes/auth");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/item", itemRoute);
app.use("/purchase", purchaseRoute);
app.use("/auth", authRoute);

const { MONGODB_URI, PORT } = process.env;

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Web Server is running on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
});

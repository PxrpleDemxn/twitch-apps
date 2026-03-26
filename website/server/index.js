const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const itemRoute = require("./routes/item");
const purchaseRoute = require("./routes/purchase");
const authRoute = require("./routes/auth");
const coinsHistoryRoute = require("./routes/coinsHistory");
const gameRoute = require("./routes/game");
const permissionRoute = require("./routes/permission");
const { authenticate } = require("./utils/verifyPerms");
const { loadPermissions } = require("./helpers/global");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

loadPermissions();

app.use("/auth", authRoute);

app.use("/permission", authenticate, permissionRoute);
app.use("/user", authenticate, userRoute);
app.use("/item", authenticate, itemRoute);
app.use("/purchase", authenticate, purchaseRoute);

app.use("/coinsHistory", authenticate, coinsHistoryRoute);
app.use("/game", authenticate, gameRoute);

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

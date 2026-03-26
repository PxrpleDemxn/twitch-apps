const express = require("express");
const router = express.Router();
const { verifyPermissions } = require("../utils/permissionParser");
const { authenticate } = require("../utils/verifyPerms");

const User = require("../models/User");

router.get("/get", authenticate, async (req, res) => {
  const twitchId = req.twitchId;

  const user = await User.findOne({ twitchId: twitchId });
  console.log(twitchId);
  res.send(user);
});

router.post("/addCurrency", async (req, res) => {
  const payload = req.body;

  const hasPermission = await verifyPermissions(
    req.twitchId,
    "user",
    "addCurrency",
  );

  console.log("Permission check result:", hasPermission);

  if (!hasPermission) {
    return res.status(403).send({ message: "You do not have permission." });
  }

  const updatedUser = await User.findOneAndUpdate(
    { twitchId: payload.twitchId },
    {
      $inc: { coins: payload.amount },
      $push: {
        coinsHistory: {
          reason: payload.reason,
          amount: payload.amount,
          date: new Date(),
        },
      },
    },
    { new: true },
  );

  res.send(updatedUser);
});

router.post("/update", async (req, res) => {
  const payload = req.body;

  const updatedUser = await User.updateOne(
    { twitchId: payload.twitchId },
    payload,
  );

  res.send(updatedUser);
});

router.post("/delete", async (req, res) => {
  const payload = req.body;

  const user = await User.findOne({ twitchId: payload.twitchId });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  if (user.storePurchaseList.length > 0 && !payload.forceDelete) {
    return res.status(400).send({
      message: "This user has existing purchases. Deleting is at risk.",
    });
  }

  await User.deleteOne({ twitchId: payload.twitchId });

  res.send({});
});

module.exports = router;

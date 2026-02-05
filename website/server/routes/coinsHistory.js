const express = require("express");
const router = express.Router();

const CoinsHistory = require("../models/CoinsHistory");
const { default: authenticateToken } = require("../utils/authenticateToken");

router.get("/list", async (req, res) => {
  const payload = req.query;
  console.log(payload);

  const day = new Date(payload.date);
  const startOfDay = new Date(day.setHours(0, 0, 0, 0));
  const endOfDay = new Date(day.setHours(23, 59, 59, 999));

  const itemList = await CoinsHistory.find({
    twitchId: payload.twitchId,
    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  }).sort({ date: -1 });

  res.send(itemList);
});

router.get("/listAll", authenticateToken, async (req, res) => {
  const twitchId = req.twitchId;

  const itemList = await CoinsHistory.find({
    twitchId,
  }).sort({ date: -1 });

  res.send(itemList);
});

module.exports = router;

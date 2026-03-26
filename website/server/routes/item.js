const express = require("express");
const router = express.Router();
const { authenticate } = require("../utils/verifyPerms");

const Item = require("../models/Item");

router.post("/create", authenticate, async (req, res) => {
  const payload = req.body;

  const newItem = new Item(payload);
  await newItem.save();

  res.send(newItem);
});

router.get("/list", authenticate, async (req, res) => {
  const itemList = await Item.find({});

  res.send(itemList);
});

module.exports = router;

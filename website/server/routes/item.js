const express = require("express");
const router = express.Router();

const Item = require("../models/Item");

router.post("/create", async (req, res) => {
  const payload = req.body;

  const newItem = new Item(payload);
  await newItem.save();

  res.send(newItem);
});

router.get("/list", async (req, res) => {
  const itemList = await Item.find({});

  res.send(itemList);
});

module.exports = router;

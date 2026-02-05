const express = require("express");
const router = express.Router();

const Game = require("../models/Game");

router.post("/create", async (req, res) => {
  const payload = req.body;

  const newGame = new Game(payload);
  await newGame.save();

  res.send(newGame);
});

router.post("/update", async (req, res) => {
  const payload = req.body;

  const updatedGame = await Game.findOneAndUpdate(
    { _id: payload.id },
    payload,
    { new: true },
  );

  res.send(updatedGame);
});

router.get("/list", async (req, res) => {
  const gameList = await Game.find({});
  res.send(gameList);
});

router.post("/delete", async (req, res) => {
  const payload = req.body;
  await Game.findOneAndDelete({ _id: payload._id });
  res.send({ success: true });
});

module.exports = router;

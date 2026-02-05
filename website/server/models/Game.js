const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
    rating: { type: Number, default: 0 },
    timesFinished: { type: Number, default: 0 },
    steamStoreUrl: { type: String, default: null },
    artworkUrl: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

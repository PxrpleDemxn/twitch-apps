const mongoose = require("mongoose");

const twitchSessionSchema = new mongoose.Schema(
  {
    twitchId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const TwitchSession = mongoose.model("TwitchSession", twitchSessionSchema);

module.exports = TwitchSession;

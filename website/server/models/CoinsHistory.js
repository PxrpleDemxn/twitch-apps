const mongoose = require("mongoose");

const coinsHistorySchema = new mongoose.Schema(
  {
    twitchId: { type: String, required: true },
    reason: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

coinsHistorySchema.index({ twitchId: 1, date: -1 });

const CoinsHistory = mongoose.model("CoinsHistory", coinsHistorySchema);

module.exports = CoinsHistory;

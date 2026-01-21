const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    twitchId: { type: String, required: true, unique: true },
    username: { type: String, default: null },
    profileImageUrl: { type: String, default: null },
    watchTime: { type: Number, default: 0 },
    claimedFollowBonus: { type: Boolean, default: false },
    followingSince: { type: Date, default: null },
    isSubscriber: { type: Boolean, default: false },
    coins: { type: Number, default: 0 },
    coinsHistory: [
      {
        _id: false,
        reason: String,
        amount: Number,
        date: { type: Date, default: Date.now },
      },
    ],
    storePurchaseList: [
      {
        _id: false,
        itemId: String,
        purchaseId: String,
        purchaseDate: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const User = mongoose.model("User", userSchema);

module.exports = User;

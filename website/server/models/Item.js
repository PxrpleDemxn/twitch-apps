const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
    price: { type: Number, required: true },
    type: { type: String, default: "redeem" },
    limit: { type: Number, default: 0 },
    imageUrl: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

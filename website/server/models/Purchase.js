const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    twitchId: { type: String, required: true },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Item",
    },
    purchaseDate: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;

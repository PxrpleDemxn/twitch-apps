const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Item = require("../models/Item");
const Purchase = require("../models/Purchase");
const { default: authenticateToken } = require("../utils/authenticateToken");

router.post("/create", authenticateToken, async (req, res) => {
  const { twitchId, itemId } = req.body;

  const user = await User.findOne({ twitchId });
  const item = await Item.findOne({ _id: itemId });
  if (!user || !item) {
    return res.status(404).send({ message: "User or item not found" });
  }

  if (user.coins < item.price) {
    return res.send({ message: "Insufficient currency for this purchase" });
  }

  const newPurchase = new Purchase({ twitchId, itemId: item._id });
  await newPurchase.save();

  await User.updateOne(
    { twitchId: twitchId },
    {
      $inc: { currency: -item.price },
      $push: {
        storePurchaseList: {
          purchaseId: newPurchase._id,
          itemId: newPurchase.itemId,
          date: newPurchase.purchaseDate,
        },
        coinsHistory: {
          amount: -item.price,
          reason: `${item.name}`,
          date: new Date(),
        },
      },
    },
  );

  res.send(newPurchase);
});

router.get("/get", async (req, res) => {
  const payload = req.body;
  const purchase = await Purchase.findOne({ _id: payload.purchaseId });
  res.send(purchase);
});

module.exports = router;

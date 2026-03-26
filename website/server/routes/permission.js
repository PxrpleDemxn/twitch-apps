const express = require("express");
const router = express.Router();

const { verifyPermissions } = require("../utils/permissionParser");

const Permission = require("../models/Permission");

router.post("/create", async (req, res) => {
  const payload = req.body;

  const hasPermission = await verifyPermissions(
    req.twitchId,
    "permission",
    "create",
  );

  if (!hasPermission) {
    return res.status(403).send({ message: "You do not have permission." });
  }

  const newPermission = new Permission(payload);
  await newPermission.save();

  res.send(newPermission);
});

router.post("/update", async (req, res) => {
  const payload = req.body;

  const hasPermission = await verifyPermissions(
    req.twitchId,
    "permission",
    "update",
  );

  if (!hasPermission) {
    return res.status(403).send({ message: "You do not have permission." });
  }

  await Permission.findOneAndUpdate({ twitchId: payload.twitchId }, payload, {
    new: true,
  });

  res.send(updatedPermission);
});

router.post("/delete", async (req, res) => {
  const payload = req.body;

  const hasPermission = await verifyPermissions(
    req.twitchId,
    "permission",
    "delete",
  );

  if (!hasPermission) {
    return res.status(403).send({ message: "You do not have permission." });
  }

  await Permission.findOneAndDelete({
    twitchId: payload.twitchId,
  });

  res.send({});
});

module.exports = router;

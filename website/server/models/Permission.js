const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    twitchId: { type: String, required: true, unique: true },
    permissionList: [{ type: String }],
  },
  { versionKey: false },
);

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;

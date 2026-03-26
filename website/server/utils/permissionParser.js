const fs = require("fs");
const path = require("path");

const Permission = require("../models/Permission");

const verifyPermissions = async (twitchId, route, method) => {
  try {
    const filePath = path.join(process.cwd(), "permissions", `${route}.json`);
    const permission = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const allowedRoles = permission[method]?.roles || [];

    if (allowedRoles.length === 0) {
      console.error(
        `No permissions defined for '${route}/${method}' or it's empty.`,
      );
      return false;
    }

    const userPermissionList = await Permission.find({ twitchId });
    if (userPermissionList.length === 0) {
      console.error(`No permissions found for user: ${twitchId}`);
      return false;
    }

    const hasPermission = userPermissionList.some((userPermission) =>
      userPermission.permissionList.some((role) => allowedRoles.includes(role)),
    );

    return hasPermission;
  } catch (error) {
    console.error(
      `Error verifying permissions for ${route}/${method}:`,
      error.message,
    );
    return false;
  }
};

module.exports = { verifyPermissions };

const fs = require("fs");
const path = require("path");

let cachedPermissions = null;

const loadPermissions = async () => {
  if (cachedPermissions) {
    throw new Error(
      "Permissions have already been loaded. Use getPermissions() to access the cached permissions.",
    );
  }
  const permissions = await fs.promises.readFile(
    path.join(process.cwd(), "permissions", "permissions.json"),
    "utf8",
  );

  const parsedPermissions = JSON.parse(permissions);
  const permissionMap = new Map();

  parsedPermissions.forEach((perm) => {
    permissionMap.set(perm.path, perm);
  });

  cachedPermissions = permissionMap;
  return permissionMap;
};

const getPermissions = async () => {
  if (!cachedPermissions) {
    return await loadPermissions();
  }
  return cachedPermissions;
};

module.exports = {
  loadPermissions,
  getPermissions,
};

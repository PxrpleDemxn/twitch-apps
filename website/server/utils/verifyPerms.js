const { getPermissions } = require("../helpers/global");
const Permission = require("../models/Permission");
const { authenticateToken } = require("../auth/authService");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  const decoded = await authenticateToken(token);

  const permissions = await getPermissions();

  const entity = req.baseUrl.replace("/", "");
  const action = req.path.replace("/", "");
  const path = `${entity}/${action}`;

  const config = permissions.get(path);

  const twitchId = decoded.twitchId;
  req.twitchId = twitchId;

  if (!config) {
    return res.status(404).json({ error: "Permission config not found" });
  }
  const userPermissions = await Permission.find({
    twitchId: twitchId,
  });
  const hasPermission = config.roles.some((role) =>
    userPermissions.some((userPerm) => userPerm.permissionList.includes(role)),
  );

  if (hasPermission) {
    return next();
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
};

module.exports = { authenticate };

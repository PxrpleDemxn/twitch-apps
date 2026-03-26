import jwt from "jsonwebtoken";

export const login = async (username, password) => {
  // WIP: Login logic
};

export const authenticateToken = async (token) => {
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

  return verifiedToken;
};

export default { login, authenticateToken };

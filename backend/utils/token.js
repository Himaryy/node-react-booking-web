import jwt from "jsonwebtoken";

export const signAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN, {
    expiresIn: "30d",
  });
};

export const signRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN, {
    expiresIn: "3d",
  });
};

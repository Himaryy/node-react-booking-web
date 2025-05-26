import dotenv from "dotenv";
import { signAccessToken, signRefreshToken } from "./token.js";

dotenv.config();

const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);

// Cookie options (no TypeScript interfaces in JS)
const accessTokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  // httpOnly: false,
  secure: true,
  sameSite: "none",
};

const refreshTokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: false,
  sameSite: "none",
};

// Send token in cookies and response
const sendToken = (user, statusCode, res) => {
  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  // Store session in Redis
  //   redis.set(user._id.toString(), JSON.stringify(user));

  // Set cookies
  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  // Send response
  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};

export { accessTokenOptions, refreshTokenOptions, sendToken };

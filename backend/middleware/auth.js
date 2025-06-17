import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  const prisma = new PrismaClient();

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or invalid" });
    }

    const accessToken = authHeader.split(" ")[1];
    console.log(accessToken);

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Access token is not valid" });
    }

    const user = await prisma.user.findFirst({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Token verification failed" });
  }
};

// Validasi Admin or not
export const isAdmin = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  /** @type import('express').Next */ next
) => {
  if (req.user?.isAdmin === "false") {
    return next(
      res.status(403).json({
        status: false,
        message: "You are not authorized",
      })
    );
  }
  next();
};

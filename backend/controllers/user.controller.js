import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

export const createUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  const { email, name, password } = req.body;
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const response = res.status(200).json({
      status: "Successfully Create User",
      data: newUser,
    });

    return response;
  } catch (error) {
    console.log("Error During create user: ", error);
    const response = res.status(500).json({
      status: "Failed Create User",
      message: error.message,
    });

    return response;
  }
};

export const loginUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  // console.log("REQ BODY", req.body);
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email " });
    }

    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!hashedPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    sendToken(user, 200, res);

    // return res.status(200).json({
    //   message: "Login Berhasil",
    //   user: {
    //     id: user.id,
    //     email: user.email,
    //     name: user.name,
    //     role: user.role,
    //   },
    // });
  } catch (error) {
    console.log("Gagal Login: ", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const logoutUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  try {
    res.clearCookie("access_token");

    res.status(200).json({
      success: true,
      message: "User Logout Successfully",
    });
  } catch (error) {
    console.log("Error Lgout User: ", error);
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getUser = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not Found",
      });
    }

    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        // role: user.role,
      },
    });
  } catch (error) {
    console.log("Error occured ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

export const loginAdmin = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { email, role: "Admin" },
    });
    const hashedPassword = await bcrypt.compare(password, user.password);

    if (!user || !hashedPassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    sendToken(user, 200, res);
    console.log(user);
  } catch (error) {
    console.log("Gagal Login: ", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const logoutAdmin = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  try {
    res.clearCookie("access_token");

    res.status(200).json({
      success: true,
      message: "Admin Logout Successfully",
    });
  } catch (error) {
    console.log("Error Lgout User: ", error);
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getAdmin = async (
  /** @type import('express').Request */ req,
  /** @type import('express').Response */ res
) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    return res.status(200).json({
      user: {
        email: user.email,
        name: user.name,
        // role: user.role,
      },
    });
  } catch (error) {
    console.log("Error occured ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
};

import express from "express";
import userRoutes from "./routes/user.route.js";
import bodyParser from "body-parser";
import AdminRouter from "./routes/admin.route.js";

const PORT = 8000;
const init = () => {
  const server = express();
  server.use(bodyParser.json({ limit: "10mb", extended: true }));
  server.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  // server.use(cors({ Credential: true }));
  server.use("/user", userRoutes);
  server.use("/admin", AdminRouter);

  server.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`);
  });
};

init();

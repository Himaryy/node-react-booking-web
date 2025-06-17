import express from "express";
import userRoutes from "./routes/user.route.js";
import bodyParser from "body-parser";
import AdminRouter from "./routes/admin.route.js";
import RuanganRouter from "./routes/ruangan.route.js";
import cors from "cors";

const PORT = 8000;
const init = () => {
  const server = express();
  server.use(bodyParser.json({ limit: "10mb", extended: true }));
  server.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
  // server.use(cors({ Credential: true }));
  server.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    })
  );
  server.use("/user", userRoutes);
  server.use("/admin", AdminRouter);
  server.use("/ruangan", RuanganRouter);

  server.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`);
  });
};

init();

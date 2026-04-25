import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import userRoutes from "../server/src/routes/user.routes.js";
import authRoutes from "../server/src/routes/auth.routes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://bteck-usermanagement.vercel.app"
  ],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

export default app;
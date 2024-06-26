import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import userRouter from "../routes/userRoutes";
import adminRouter from "../routes/adminRoutes"
import providerRouter from "../routes/providerRoutes"
import errorHandler from "../../usecase/handlers/errorHandler";

dotenv.config();
export const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(morgan("dev"));

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/provider", providerRouter);

app.use(errorHandler)
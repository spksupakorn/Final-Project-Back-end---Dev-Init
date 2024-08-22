import { AppDataSource } from "./data-source";
import cors from "cors";
import express from "express";
import { userRouter } from "./routes/user.routes";
import { dailylogRouter } from "./routes/dailylog.routes";
import { todolistRouter } from "./routes/todolist.routes";
import { calendarRouter } from "./routes/calendar.routes";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { errorHandler } from "./middleware/errorHandler";
import morgan from "morgan"
import "reflect-metadata";

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(cors())
app.use(morgan("dev"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/", dailylogRouter);
app.use("/api/v1/", todolistRouter);
app.use("/api/v1/", calendarRouter);

app.get("*", (req: Request, res: Response) => {
    res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
    .then(async () => {
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:" + PORT);
        });
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error));
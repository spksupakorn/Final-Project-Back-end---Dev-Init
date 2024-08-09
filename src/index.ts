import { AppDataSource } from "./data-source";
import express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import { userRouter } from "./routes/user.routes";
import { dailylogRouter } from "./routes/dailylog.routes";
import { errorHandler } from "./middleware/errorHandler";
import "reflect-metadata";
dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
const { PORT } = process.env;
app.use("/auth", userRouter);
app.use("/api", dailylogRouter);

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
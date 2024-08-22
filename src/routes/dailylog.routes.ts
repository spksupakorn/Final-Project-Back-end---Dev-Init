import * as express from "express";
import { authentification } from "../middleware/authentification";
import { DailyLogController } from "../controllers/dailylog.controllers";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.get("/logs", authentification, authorization(["user"]), DailyLogController.getAllDailylogs);
Router.get("/logs/:id", authentification, authorization(["user"]), DailyLogController.getDailylogById);
Router.post("/logs", authentification, authorization(["user"]), DailyLogController.createDailylog);
Router.put("/logs/:id", authentification, authorization(["user"]), DailyLogController.updateDailylog);
Router.delete("/logs/:id", authentification, authorization(["user"]), DailyLogController.deleteDailylog);

export { Router as dailylogRouter };
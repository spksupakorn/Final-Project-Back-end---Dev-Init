import * as express from "express";
import { authentification } from "../middleware/authentification";
import { DailyLogController } from "../controllers/dailylog.controllers";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.get("/dailylogs", authentification, DailyLogController.getAllDailylogs);
Router.post("/dailylogs", authentification, DailyLogController.createDailylog);
Router.put("/dailylogs/:id", authentification, authorization(["admin"]), DailyLogController.updateDailylog);
Router.delete("/dailylogs/:id", authentification, authorization(["admin"]), DailyLogController.deleteDailylog);

export { Router as dailylogRouter };
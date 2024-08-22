import * as express from "express";
import { authentification } from "../middleware/authentification";
import { calendarController } from "../controllers/calendar.controller";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.get("/events", authentification, authorization(["user"]), calendarController.getAllCalendar);
Router.get("/events/:id", authentification, authorization(["user"]), calendarController.getCalendarById);
Router.post("/events", authentification, authorization(["user"]), calendarController.createCalendar);
Router.put("/events/:id", authentification, authorization(["user"]), calendarController.updateCalendar);
Router.delete("/events/:id", authentification, authorization(["user"]), calendarController.deleteTodoList);

export { Router as calendarRouter };
import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Calendar } from "../entity/Calender.entity";

export class calendarController {
    static async getAllCalendar(req: Request, res: Response) {
        const data = cache.get("calendar_data");
        if (data) {
            console.log("serving from cache");
            return res.status(200).json({ data });
        } else {
            console.log("serving from db");
            const calendarRepository = AppDataSource.getRepository(Calendar);
            const calendars = await calendarRepository.find();
            cache.put("calendar_data", calendars, 10000);
            return res.status(200).json({ data: calendars });
        }
    }

    static async getCalendarById(req: Request, res: Response) {
        const { id } = req.params;
        console.log("serving from db");
        const calendarRepository = AppDataSource.getRepository(Calendar);
        const calendars = await calendarRepository.findOne({ where: { id } });
        return res.status(200).json({ data: calendars });
    }

    static async createCalendar(req: Request, res: Response) {
        if (!req[" currentUser"]) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user_id : any = req[" currentUser"].id;
        const { title, description, start_date, end_date } = req.body;

        let start_dt: Date;
        let end_dt: Date;
        if (start_date) {
            start_dt = new Date(start_date)
        }
        if (end_date) {
            end_dt = new Date(end_date)
        }
        if (!start_date || !end_date || (end_dt < start_dt)) {
            return res.status(400).json({ message: 'end_date must be greater than start_date' });
        }

        const calendar = new Calendar();
        calendar.title = title;
        calendar.description = description;
        calendar.start_date = start_dt;
        calendar.end_date = end_dt;
        calendar.user = user_id
        const calendarRepository = AppDataSource.getRepository(Calendar);
        await calendarRepository.save(calendar);
        return res.status(201).json({ message: "Calendar created successfully",  });
    }

    static async updateCalendar(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description, start_date, end_date } = req.body;

        let start_dt: Date;
        let end_dt: Date;
        if (start_date) {
            start_dt = new Date(start_date)
        }
        if (end_date) {
            end_dt = new Date(end_date)
        }
        if (!start_date || !end_date || (end_dt < start_dt)) {
            return res.status(400).json({ message: 'end_date must be greater than start_date' });
        }

        const calendarRepository = AppDataSource.getRepository(Calendar);
        const calendar = await calendarRepository.findOne({ where: { id } });
        calendar.title = title;
        calendar.description = description;
        calendar.start_date = start_dt;
        calendar.end_date = end_dt;
        await calendarRepository.save(calendar);
        return res.status(200).json({ message: "Calendar updated successfully", calendar });
    }

    static async deleteTodoList(req: Request, res: Response) {
        const { id } = req.params;
        const calendarRepository = AppDataSource.getRepository(Calendar);
        const calendar = await calendarRepository.findOne({ where: { id } });
        await calendarRepository.remove(calendar);
        return res.status(200).json({ message: "Calendar deleted successfully", calendar });
    }
}
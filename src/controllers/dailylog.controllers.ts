import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { DailyLog } from "../entity/DailyLog.entity";

export class DailyLogController {
    static async getAllDailylogs(req: Request, res: Response) {
        const data = cache.get("daily_log_data");
        if (data) {
            console.log("serving from cache");
            return res.status(200).json({ data });
        } else {
            console.log("serving from db");
            const dailylogRepository = AppDataSource.getRepository(DailyLog);
            const dailylogs = await dailylogRepository.find();
            cache.put("daily_log_data", dailylogs, 10000);
            return res.status(200).json({ data: dailylogs });
        }
    }

    static async getDailylogById(req: Request, res: Response) {
        const { id } = req.params;
        console.log("serving from db");
        const dailylogRepository = AppDataSource.getRepository(DailyLog);
        const dailylogs = await dailylogRepository.findOne({ where: { id } });
        return res.status(200).json({ data: dailylogs });
    }

    static async createDailylog(req: Request, res: Response) {
        if (!req[" currentUser"]) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user_id : any = req[" currentUser"].id;
        const { content, date } = req.body;

        let date_log: Date;
        if (date) {
            date_log = new Date(date)
        }

        const dailylog = new DailyLog();
        dailylog.content = content;
        dailylog.date = date_log;
        dailylog.user = user_id;
        const dailylogRepository = AppDataSource.getRepository(DailyLog);
        await dailylogRepository.save(dailylog);
        return res.status(201).json({ message: "Dailylog created successfully", dailylog });
    }

    static async updateDailylog(req: Request, res: Response) {
        const { id } = req.params;
        const { content, date } = req.body;
        let date_log : Date;
        if (date) {
            date_log = new Date(date)
        }
        const dailylogRepository = AppDataSource.getRepository(DailyLog);
        const dailylog = await dailylogRepository.findOne({ where: { id } });
        dailylog.content = content;
        dailylog.date = date_log;
        await dailylogRepository.save(dailylog);
        return res.status(200).json({ message: "Dailylog updated successfully", dailylog });
    }

    static async deleteDailylog(req: Request, res: Response) {
        const { id } = req.params;
        const dailylogRepository = AppDataSource.getRepository(DailyLog);
        const dailylog = await dailylogRepository.findOne({ where: { id } });
        await dailylogRepository.remove(dailylog);
        return res.status(200).json({ message: "Dailylog deleted successfully", dailylog });
    }
}
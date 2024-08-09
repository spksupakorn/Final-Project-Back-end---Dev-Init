import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { DailyLog } from "../entity/DailyLog.entity";

export class DailyLogController {
    static async getAllDailylogs(req: Request, res: Response) {
        const data = cache.get("data");
        if (data) {
            console.log("serving from cache");
            return res.status(200).json({ data });
        } else {
            console.log("serving from db");
            const dailylogRepository = AppDataSource.getRepository(DailyLog);
            const dailylogs = await dailylogRepository.find();
            cache.put("data", dailylogs, 10000);
            return res.status(200).json({ data: dailylogs });
        }
    }

    static async createDailylog(req: Request, res: Response) {
        const { content, date } = req.body;
        const dailylog = new DailyLog();
        dailylog.content = content;
        dailylog.date = date;
        const dailylogRepository = AppDataSource.getRepository(DailyLog);
        await dailylogRepository.save(dailylog);
        return res.status(200).json({ message: "Dailylog created successfully", dailylog });
    }

    static async updateDailylog(req: Request, res: Response) {
        const { log_id } = req.params;
        const { content, date } = req.body;
        const dailylogRepository = AppDataSource.getRepository(DailyLog);
        const dailylog = await dailylogRepository.findOne({ where: { log_id } });
        dailylog.content = content;
        dailylog.date = date;
        await dailylogRepository.save(dailylog);
        return res.status(200).json({ message: "Dailylog updated successfully", dailylog });
    }

    static async deleteDailylog(req: Request, res: Response) {
        const { log_id } = req.params;
        const dailylogRepository = AppDataSource.getRepository(DailyLog);
        const dailylog = await dailylogRepository.findOne({ where: { log_id } });
        await dailylogRepository.remove(dailylog);
        return res.status(200).json({ message: "Dailylog deleted successfully", dailylog });
    }
}
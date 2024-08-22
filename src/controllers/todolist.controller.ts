import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { ToDoList, TodoStatus } from "../entity/ToDoList.entity";

export class TodoListController {
    static async getAllTodoList(req: Request, res: Response) {
        const data = cache.get("todolist_data");
        if (data) {
            console.log("serving from cache");
            return res.status(200).json({ data });
        } else {
            console.log("serving from db");
            const todolistRepository = AppDataSource.getRepository(ToDoList);
            const todolists = await todolistRepository.find();
            cache.put("todolist_data", todolists, 10000);
            return res.status(200).json({ data: todolists });
        }
    }

    static async getTodoListById(req: Request, res: Response) {
        const { id } = req.params;
        console.log("serving from db");
        const todolistRepository = AppDataSource.getRepository(ToDoList);
        const todolists = await todolistRepository.findOne({ where: { id } });
        return res.status(200).json({ data: todolists });
    }

    static async createTodoList(req: Request, res: Response) {
        if (!req[" currentUser"]) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user_id : any = req[" currentUser"].id;
        const { title, description, due_date, priority, status } = req.body;

        if (!Object.values(TodoStatus).includes(status)) {
            return res.status(400).json({ message: 'Invalid Todo Status' });
        }

        let todo_date: Date;
        if (due_date) {
            todo_date = new Date(due_date)
        }

        const todolist = new ToDoList();
        todolist.title = title;
        todolist.description = description;
        todolist.due_date = todo_date;
        todolist.priority = priority;
        todolist.status = status;
        todolist.user = user_id;
        const todolistRepository = AppDataSource.getRepository(ToDoList);
        await todolistRepository.save(todolist);
        return res.status(201).json({ message: "Todolist created successfully", todolist });
    }

    static async updateTodoList(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description, due_date, priority, status } = req.body;

        if (!Object.values(TodoStatus).includes(status)) {
            return res.status(400).json({ message: 'Invalid Todo Status' });
        }
        
        let todo_date: Date;
        if (due_date) {
            todo_date = new Date(due_date)
        }

        const todolistRepository = AppDataSource.getRepository(ToDoList);
        const todolist = await todolistRepository.findOne({ where: { id } });
        todolist.title = title;
        todolist.description = description;
        todolist.due_date = todo_date;
        todolist.priority = priority;
        todolist.status = status;
        await todolistRepository.save(todolist);
        return res.status(200).json({ message: "Todolist updated successfully", todolist });
    }

    static async deleteTodoList(req: Request, res: Response) {
        const { id } = req.params;
        const todolistRepository = AppDataSource.getRepository(ToDoList);
        const todolist = await todolistRepository.findOne({ where: { id } });
        await todolistRepository.remove(todolist);
        return res.status(200).json({ message: "Todolist deleted successfully", todolist });
    }
}
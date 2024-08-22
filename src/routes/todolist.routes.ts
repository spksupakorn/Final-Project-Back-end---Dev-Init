import * as express from "express";
import { authentification } from "../middleware/authentification";
import { TodoListController } from "../controllers/todolist.controller";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.get("/todos", authentification, authorization(["user"]), TodoListController.getAllTodoList);
Router.get("/todos/:id", authentification, authorization(["user"]), TodoListController.getTodoListById);
Router.post("/todos", authentification, authorization(["user"]), TodoListController.createTodoList);
Router.put("/todos/:id", authentification, authorization(["user"]), TodoListController.updateTodoList);
Router.delete("/todos/:id", authentification, authorization(["user"]), TodoListController.deleteTodoList);

export { Router as todolistRouter };
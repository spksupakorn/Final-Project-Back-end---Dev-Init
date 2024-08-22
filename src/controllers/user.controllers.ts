import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
import { auth } from "../helpers/auth";
// import { UserResponce } from "../dto/user.dto";
import * as cache from "memory-cache";

export class UserController {
    static async signup(req: Request, res: Response) {
        const { username, email, password, role } = req.body;

        const userExist = await auth.checkDuplicate(username, email);
        
        if (userExist) {
            return res.status(404).json({ message: "Username or email already exists." });
        } else {
            const encryptedPassword = await encrypt.encryptpass(password);
            const user = new User();
            user.username = username;
            user.email = email;
            user.password = encryptedPassword;
            user.role = role;

            const userRepository = AppDataSource.getRepository(User);
            await userRepository.save(user);

            // const userdataSent = new UserResponce()
            // userdataSent.username = user.username
            // userdataSent.email = user.email
            // userdataSent.role = user.role

            // userRepository.create({ Name, email, password });
            const token = encrypt.generateToken({ id: user.id });

            return res.status(201).json({ message: "User created successfully", token, user });
        }
    }

    // static async getUsers(req: Request, res: Response) {
    //     const data = cache.get("data");
    //     if (data) {
    //         console.log("serving from cache");
    //         return res.status(200).json({
    //             data,
    //         });
    //     } else {
    //         console.log("serving from db");
    //         const userRepository = AppDataSource.getRepository(User);
    //         const users = await userRepository.find();

    //         cache.put("data", users, 6000);
    //         return res.status(200).json({ data: users });
    //     }
    // }

    // static async updateUser(req: Request, res: Response) {
    //     const { id } = req.params;
    //     const { name, email } = req.body;
    //     const userRepository = AppDataSource.getRepository(User);
    //     const user = await userRepository.findOne({ where: { id } });
    //     user.username = name;
    //     user.email = email;
    //     await userRepository.save(user);
    //     res.status(200).json({ message: "update", user });
    // }

    // static async deleteUser(req: Request, res: Response) {
    //     const { id } = req.params;
    //     const userRepository = AppDataSource.getRepository(User);
    //     const user = await userRepository.findOne({ where: { id } });
    //     await userRepository.remove(user);
    //     res.status(200).json({ message: "ok" });
    // }
}
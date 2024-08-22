import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";

export class auth {
    static async checkDuplicate(username: string, email: string ) {
        const userRepository = AppDataSource.getRepository(User);
        
        const user = await userRepository.findOne({
            where: [
                { username: username },
                { email: email }
            ]
        })

        return user;
    }
}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { ToDoList } from "./ToDoList.entity"; 
import { DailyLog } from "./DailyLog.entity";
import { Calendar } from "./Calender.entity";
@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, unique: true, nullable: false })
    username: string;

    @Column({ length: 100, unique: true, nullable: false })
    email: string;
    
    @Column({ length: 255, nullable: false })
    password: string;
    
    @Column({ default: "user" })
    role: string;

    @OneToMany(() => ToDoList, (todo_list) => todo_list.user)
    todo_lists: ToDoList[]

    @OneToMany(() => DailyLog, (daily_log) => daily_log.user)
    daily_logs: DailyLog[]

    @OneToMany(() => Calendar, (calendar) => calendar.user)
    calendars: Calendar[]
    
    @CreateDateColumn({ type: "timestamptz", precision: 3 })
    createdAt: Date;
    
    @Column({ type: "timestamptz", precision: 3, nullable: true })
    last_login: Date;
}
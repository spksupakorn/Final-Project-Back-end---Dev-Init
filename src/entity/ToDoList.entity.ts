import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

export enum TodoStatus {
    PENDING = "pending",
    COMPLETED = "completed"
}

@Entity({ name: "to_do_list" })
export class ToDoList {
    @PrimaryGeneratedColumn("uuid")
    todo_id: string;
    
    @ManyToOne(() => User, user => user.user_id)
    user: User;

    @Column({ length: 100, nullable: false })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: "date", nullable: true })
    due_date: Date;

    @Column({ nullable: false })
    priority: number;

    @Column({
        type: "enum",
        enum: TodoStatus,
        default: TodoStatus.PENDING,
    })
    status: TodoStatus;

    @CreateDateColumn({ type: "timestamptz", precision: 3 })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz", precision: 3 })
    updatedAt: Date;
}
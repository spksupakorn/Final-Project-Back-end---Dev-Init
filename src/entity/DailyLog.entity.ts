import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "daily_logs" })
export class DailyLog {
    @PrimaryGeneratedColumn("uuid")
    id: string;    

    @Column({ nullable: false })
    content: string;

    @Column({ type: "date", nullable: true })
    date: Date;

    @ManyToOne(() => User, (user) => user.daily_logs)
    @JoinColumn({ name: "user_id" })
    user: User;

    @CreateDateColumn({ type: "timestamptz", precision: 3 })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz", precision: 3 })
    updatedAt: Date;
}
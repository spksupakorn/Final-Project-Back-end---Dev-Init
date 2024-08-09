import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "daily_logs" })
export class DailyLog {
    @PrimaryGeneratedColumn("uuid")
    log_id: string;

    @ManyToOne(() => User, user => user.user_id)
    user: User;

    @Column({ nullable: false })
    content: string;

    @Column({ type: "date", nullable: true })
    date: Date;

    @CreateDateColumn({ type: "timestamptz", precision: 3 })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz", precision: 3 })
    updatedAt: Date;
}
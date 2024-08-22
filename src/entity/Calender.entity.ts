import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "calendar" })
export class Calendar {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: "timestamptz", precision: 3 })
    start_date: Date;

    @Column({ type: "timestamptz", precision: 3 })
    end_date: Date;

    @ManyToOne(() => User, (user) => user.calendars)
    @JoinColumn({ name: "user_id" })
    user: User;

    @CreateDateColumn({ type: "timestamptz", precision: 3 })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz", precision: 3 })
    updatedAt: Date;
}
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "calendar" })
export class Calendar {
    @PrimaryGeneratedColumn("uuid")
    event_id: string;

    @ManyToOne(() => User, user => user.user_id)
    user: User;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: "timestamptz", precision: 3 })
    start_date: Date;

    @Column({ type: "timestamptz", precision: 3 })
    end_date: Date;

    @CreateDateColumn({ type: "timestamptz", precision: 3 })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz", precision: 3 })
    updatedAt: Date;
}
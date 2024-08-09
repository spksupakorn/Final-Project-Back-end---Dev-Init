import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    @Column({ length: 50, unique: true, nullable: false })
    username: string;

    @Column({ length: 100, unique: true, nullable: false })
    email: string;
    
    @Column({ length: 255, nullable: false })
    password: string;
    
    @Column({ default: "user" })
    role: string;
    
    @CreateDateColumn({ type: "timestamptz", precision: 3 })
    createdAt: Date;
    
    @Column({ type: "timestamptz", precision: 3, nullable: true })
    last_login: Date;
}
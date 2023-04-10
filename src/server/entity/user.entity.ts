import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class user {
    @PrimaryColumn({ name: 'u_id' })
    uid: string

    @Column()
    pswd: string

    @Column()
    email: string

    @Column()
    name: string

    @Column()
    avatar: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
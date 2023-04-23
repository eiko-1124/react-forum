import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class chat {
    @PrimaryColumn({ name: 'h_id' })
    hid: string

    @Column({ name: 'u_id_1' })
    uid1: string

    @Column({ name: 'u_id_2' })
    uid2: string

    @Column()
    text: string

    @Column()
    read: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
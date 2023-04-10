import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"

@Entity('plate_subscribe')
export class plateSubscribe {
    @PrimaryColumn({ name: 'p_id' })
    pid: string

    @PrimaryColumn({ name: 'u_id' })
    uid: string

    @Column()
    name: string

    @Column({ default: 0 })
    exp: number

    @Column({ default: 1 })
    level: number

    @Column({ default: 0 })
    admin: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
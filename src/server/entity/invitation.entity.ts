import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class invitation {
    @PrimaryColumn()
    id: string

    @Column()
    pid: string

    @Column()
    uid: string

    @Column({ default: '0' })
    top: string

    @Column()
    title: string

    @Column()
    text: string

    @Column({ default: 0 })
    view: number

    @Column({ default: 0 })
    like: number

    @Column({ default: 0 })
    comment: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date

    @Column({ default: '0' })
    exc: string
}
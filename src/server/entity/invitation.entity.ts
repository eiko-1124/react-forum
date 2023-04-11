import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class invitation {
    @PrimaryColumn({ name: 'i_id' })
    iid: string

    @Column()
    owner: string

    @Column()
    plate: string

    @Column()
    title: string

    @Column()
    text: string

    @Column({ default: 0 })
    top: number

    @Column({ default: 0 })
    quality: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
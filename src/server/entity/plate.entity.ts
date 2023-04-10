import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class plate {
    @PrimaryColumn({ name: 'p_id' })
    pid: string

    @Column()
    name: string

    @Column()
    introduction: string

    @Column()
    avatar: string

    @Column()
    tag: string

    @Column()
    notice: string

    @Column()
    owner: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class upload {
    @PrimaryColumn({ name: 'f_id' })
    fid: string

    @Column()
    name: string

    @Column()
    path: string

    @Column()
    url: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
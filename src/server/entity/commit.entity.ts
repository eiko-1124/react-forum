import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class commit {
    @PrimaryColumn({ name: 'c_id' })
    cid: string

    @Column({ name: 'u_id_1' })
    uid1: string

    @Column({ name: 'u_id_2' })
    uid2: string

    @Column({ name: 'i_id' })
    iid: string

    @Column()
    floor: string

    @Column()
    text: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class notice {
    @PrimaryColumn({ name: 'n_id' })
    nid: string

    @Column({ name: 'u_id_1' })
    uid1: string

    @Column({ name: 'u_id_2' })
    uid2: string

    @Column({ name: 'p_id' })
    pid: string

    @Column()
    type: string

    @Column()
    flag: string

    @Column({ name: 'i_id' })
    iid: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
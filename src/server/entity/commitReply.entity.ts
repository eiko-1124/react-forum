import { Entity, PrimaryColumn, CreateDateColumn, Column } from "typeorm"

@Entity('commit_reply')
export class commitReply {
    @PrimaryColumn({ name: 'c_id_1' })
    cid1: string

    @Column({ name: 'c_id_2' })
    cid2: string

    @Column({ name: 'p_id' })
    pid: string

    @Column({ name: 'u_id_1' })
    uid1: string

    @Column({ name: 'u_id_2' })
    uid2: string

    @Column()
    text: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
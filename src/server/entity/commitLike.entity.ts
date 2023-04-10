import { Entity, PrimaryColumn, CreateDateColumn, Column } from "typeorm"

@Entity('commit_like')
export class commitLike {
    @PrimaryColumn({ name: 'c_id' })
    cid: string

    @PrimaryColumn({ name: 'u_id' })
    uid: string

    @Column()
    owner: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
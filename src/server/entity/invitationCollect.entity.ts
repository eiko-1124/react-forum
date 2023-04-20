import { Entity, PrimaryColumn, CreateDateColumn, Column } from "typeorm"

@Entity('invitation_collect')
export class invitationCollect {
    @PrimaryColumn({ name: 'u_id' })
    uid: string

    @PrimaryColumn({ name: 'i_id' })
    iid: string

    @Column()
    floor: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
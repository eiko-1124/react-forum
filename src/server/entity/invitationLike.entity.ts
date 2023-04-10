import { Entity, PrimaryColumn, CreateDateColumn, Column } from "typeorm"

@Entity('invitation_like')
export class invitationLike {
    @PrimaryColumn({ name: 'u_id' })
    uid: string

    @PrimaryColumn({ name: 'i_id' })
    iid: string

    @Column()
    owner: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
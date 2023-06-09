import { Entity, PrimaryColumn, CreateDateColumn } from "typeorm"

@Entity('invitation_history')
export class invitationHistory {
    @PrimaryColumn({ name: 'u_id' })
    uid: string

    @PrimaryColumn({ name: 'i_id' })
    iid: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
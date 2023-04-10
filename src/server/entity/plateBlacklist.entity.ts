import { Entity, PrimaryColumn, CreateDateColumn } from "typeorm"

@Entity('plate_blacklist')
export class plateBlacklist {
    @PrimaryColumn({ name: 'p_id' })
    pid: string

    @PrimaryColumn({ name: 'u_id' })
    uid: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
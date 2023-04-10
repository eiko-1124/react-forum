import { Entity, PrimaryColumn, CreateDateColumn } from "typeorm"

@Entity('user_blacklist')
export class userBlacklist {
    @PrimaryColumn({ name: 'u_id_1' })
    uid1: string

    @PrimaryColumn({ name: 'u_id_2' })
    uid2: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
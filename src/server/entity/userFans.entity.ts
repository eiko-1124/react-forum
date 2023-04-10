import { Entity, PrimaryColumn, CreateDateColumn, OneToOne } from "typeorm"

@Entity('user_fans')
export class userFans {
    @PrimaryColumn({ name: 'u_id_1' })
    uid1: string

    @PrimaryColumn({ name: 'u_id_2' })
    uid2: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
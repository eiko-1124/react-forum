import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class user {
    @PrimaryColumn()
    id: string

    @Column()
    pswd: string

    @Column()
    email: string

    @Column()
    name: string
}
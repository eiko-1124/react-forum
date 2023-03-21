import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class upload {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    path: string

    @Column()
    date: Date

    @Column()
    url: string
}
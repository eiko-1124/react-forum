import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class plate {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    owner: string

    @Column()
    introduction: string
}
import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class plate {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    introduction: string

    @Column()
    usum: number

    @Column()
    isum: number

    @Column()
    avatar: string

    @Column()
    tag: string

    @Column()
    notice: string
}
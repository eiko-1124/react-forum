import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('plate_user')
export class plateUser {
  @PrimaryColumn()
  uid: string

  @PrimaryColumn()
  pid: string

  @Column()
  owner: string

  @Column()
  manager: string
}
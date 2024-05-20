
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    date!: Date;

    @Column()
    status!: string;

    @ManyToOne(() => User, user => user.appointments)
    user!: User;
}

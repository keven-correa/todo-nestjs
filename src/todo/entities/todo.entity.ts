import {PrimaryGeneratedColumn, Entity, Column} from 'typeorm';

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    description: string;

    @Column({default: false})
    done: boolean;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Nomineeprofile {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nominationalCategory:string;

    @Column()
    aboutYou:string;

    @Column()

    @Column()
    Achievements:string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import Role from '../enum/role.enum';


@Entity('userpswewq')
class User {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column({ unique: true })
  public email: string;
 
  @Column()
  public name: string;
 
  @Column()
  //@Exclude()
  public password: string;
  @Column({
    nullable: true
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column({ default: false })
  public isRegisteredWithGoogle: boolean;

  @Column({ default: false })
  public isEmailConfirmed: boolean;
  //for the role management
  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.Nominee]
  })
  public roles: Role[]

  @Column()
  address:string;

  @Column()
  phoneNumber:string

  @Column()
  confirmPassword: string;

}
 
export default User;
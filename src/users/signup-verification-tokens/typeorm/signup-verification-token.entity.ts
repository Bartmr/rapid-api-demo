import { User } from 'src/users/typeorm/user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class SignupVerificationToken {
  @PrimaryColumn('uuid', { default: () => 'uuid_generate_v4()' })
  id!: string;

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @Column()
  expires!: Date;
}

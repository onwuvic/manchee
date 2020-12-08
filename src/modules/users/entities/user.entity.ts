import { Table, Column, Model, DataType, DefaultScope, Scopes, BeforeCreate, HasOne, BelongsToMany } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Profile } from '../../profiles/entities/profile.entity';
import { Friend } from '../../friends/entities/friend.entity';

@DefaultScope(() => ({
    attributes: {
        exclude: ['password']
    }
}))
@Scopes(() => ({
    withPassword: {}
}))
@Table({
    paranoid: true
})
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.ENUM,
        values: ['male', 'female'],
        allowNull: false,
    })
    gender: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    dateOfBirth: Date;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    isVerify: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    resetPasswordToken: string;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    resetPasswordExpires: number;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    verifyToken: string;

    @BeforeCreate
    static async hashPassword(user: User) {
        user.password = await bcrypt.hash(user.password, 10);
        user.gender.toLowerCase();
    }

    @HasOne(() => Profile)
    profile: Profile;

    @BelongsToMany(() => User, () => Friend, 'senderId', 'receiverId')
    senders: User[];

    @BelongsToMany(() => User, () => Friend, 'receiverId', 'senderId')
    receivers: User[];
}

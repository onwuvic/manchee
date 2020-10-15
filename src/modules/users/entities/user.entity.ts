import { Table, Column, Model, DataType, DefaultScope, Scopes, BeforeCreate, HasOne } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Profile } from '../../profiles/entities/profile.entity';

@DefaultScope(() => ({
    attributes: {
        exclude: ['password']
    }
}))
@Scopes(() => ({
    withPassword: {}
}))
@Table
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
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    isVerify: boolean;

    @Column({
        type: DataType.ENUM,
        values: ['male', 'female'],
        allowNull: false,
    })
    gender: string;

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

    @BeforeCreate
    static async hashPassword(user: User) {
        user.password = await bcrypt.hash(user.password, 10);
        user.gender.toLowerCase();
    }

    @HasOne(() => Profile)
    profile: Profile;
}

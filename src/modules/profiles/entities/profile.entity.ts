import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../../modules/users/entities/user.entity';

@Table
export class Profile extends Model<Profile> {
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    avatarImage: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    coverImage: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    bio: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}

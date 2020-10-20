import { Table, Column, Model, DataType, ForeignKey, Default } from 'sequelize-typescript';
import { PENDING, ACCEPTED, REJECTED } from '../../../core/constants';
import { User } from '../../../modules/users/entities/user.entity';

@Table
export class Friend extends Model<Friend> {

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    senderId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    receiverId: number;

    @Default(PENDING)
    @Column({
        type: DataType.ENUM,
        values: [ACCEPTED, PENDING, REJECTED],
        allowNull: false,
    })
    status: string;
}

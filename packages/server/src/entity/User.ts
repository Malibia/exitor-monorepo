import * as bycrypt from "bycryptjs";
import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    BeforeInsert
} from "typeorm";


@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;

    @Column("varchar", { length: 255 })
    email: string;

    @Column("text") password: string;

    @Column("boolean", { default: false })
    forgotPasswordLocked: boolean;

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        this.password = await bycrypt.hash(this.password, 10);
    }
}
import { Column, Entity } from "typeorm";
import BaseModel from "./BaseModel";

export enum Role {
  ADMINISTRATOR = "administrator",
  USER = "user",
}

@Entity("users")
export default class UserModel extends BaseModel {
  @Column({ type: "char", length: 16, nullable: false, comment: "16文字のランダム文字列; 認証トークン用" })
  public rnd!: string;

  @Column({ type: "enum", enum: Role, default: Role.USER, comment: "役職" })
  public role!: Role;

  @Column({ type: "varchar", length: 255, nullable: false, comment: "名前" })
  public name!: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false, comment: "ログインID" })
  public loginId!: string;

  @Column({ type: "char", length: 254, nullable: false, comment: "ログインパスワードのハッシュ値" })
  public passwordHash!: string;
}

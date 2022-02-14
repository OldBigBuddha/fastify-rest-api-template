import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

const TABLE_NAME = "users";

@Entity(TABLE_NAME)
export default class UserModel {
  @PrimaryGeneratedColumn("increment", { type: "bigint", unsigned: true, comment: "内部ID" })
  readonly id!: number;

  @Index(`IDX:${TABLE_NAME}:uuid`, {
    unique: true,
  })
  @Column({ type: "uuid", nullable: false })
  public uuid!: string;

  @Column({ type: "varchar", length: 255, nullable: false, comment: "表示名" })
  public displayName!: string;

  @Index(`IDX:${TABLE_NAME}:login_id`, {
    unique: true,
  })
  @Column({ type: "varchar", length: 255, unique: true, nullable: false, comment: "ログインID" })
  public loginId!: string;

  @Column({ type: "varchar", length: 255, nullable: false, comment: "ログインパスワードのハッシュ値" })
  public passwordHash!: string;

  @Column({ type: "char", length: 16, nullable: false, comment: "16文字のランダム文字列; 認証トークン用" })
  public rnd!: string;

  @Column({ type: "bigint", unsigned: true, nullable: false, comment: "作成日時; Unix時間（ミリ秒）" })
  public createdAt!: number;

  @Column({ type: "bigint", unsigned: true, nullable: true, comment: "削除日時; Unix時間（ミリ秒）" })
  public deletedAt!: number | null;
}

import { Column, PrimaryGeneratedColumn } from "typeorm";

export default abstract class BaseModel {
  @PrimaryGeneratedColumn("increment", { comment: "ID" })
  id!: number;

  @Column({ type: "uuid", nullable: false, unique: true, comment: "UUID" })
  uuid!: string;
}

import Entity, { ValueObjectCore as Core } from "./Entity";

export interface ValueObjectCore extends Core {
  deletedAt?: number;
}

abstract class TrashableEntity<Value extends ValueObjectCore> extends Entity<Value> {
  /**
   * Entityを論理削除する
   */
  trash(): void {
    this.values.deletedAt = Date.now();
  }

  /**
   * 論理削除状態のEntityを復元する
   */
  restore(): void {
    this.values.deletedAt = undefined;
  }

  /**
   * 論理削除状態かどうか
   *
   * @returns 論理削除されていたらTrue
   */
  hasTrashed(): boolean {
    return this.values.deletedAt != null;
  }
}

export default TrashableEntity;

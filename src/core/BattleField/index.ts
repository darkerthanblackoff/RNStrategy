import { Unit } from '../Units';

class BattleFieldCell {
  private item: Unit | null;
  private highlighted: boolean;

  public constructor(item?: Unit) {
    this.item = item || null;
    this.highlighted = false;
  }

  public isHighlighted() {
    return this.highlighted;
  }
}

class BattleField {
  private field: Array<Array<BattleFieldCell>>;

  public constructor(rows: number, columns: number) {
    this.field = Array(rows).fill(Array(columns).fill(new BattleFieldCell()));
  }

  public getField() {
    return this.field;
  }
}

export default BattleField;

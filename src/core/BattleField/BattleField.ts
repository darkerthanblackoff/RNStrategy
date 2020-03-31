import { Unit } from '../Units';

class BattleFieldCell {
  private item: Unit | null;
  private highlighted: boolean;

  public constructor(item?: Unit) {
    item;
    this.item = null;
    this.highlighted = false;
  }

  public isHighlighted = () => {
    return this.highlighted;
  };

  public setItem = (item: Unit | null) => {
    this.item = item;
  };

  public getItem = () => {
    return this.item;
  };
}

class BattleField {
  private field: Array<Array<BattleFieldCell>>;
  private rows: number;
  private columns: number;

  public constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.field = Array(rows).fill(Array(columns).fill(new BattleFieldCell()));
  }

  public getField() {
    return this.field;
  }

  public getCellByUnit = (unit: Unit) => {
    let res = null;

    this.field.forEach(row => {
      row.forEach(cell => {
        if (cell.getItem() === unit) {
          res = cell;
        }
      });
    });

    return res;
  };

  public getRows = () => {
    return this.rows;
  };

  public getColumns = () => {
    return this.columns;
  };
}

export default BattleField;

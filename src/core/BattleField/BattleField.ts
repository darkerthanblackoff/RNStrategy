import { Unit } from '../Units';

export class BattleFieldCell {
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

  public setHighlight = (value: boolean) => {
    this.highlighted = value;
  };

  public setItem = (item: Unit | null) => {
    this.item = item;
  };

  public getItem = () => {
    return this.item;
  };
}

export default class BattleField {
  private field: Array<Array<BattleFieldCell>>;
  private rows: number;
  private columns: number;

  public constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.field = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.field[i] = new Array(columns);
      for (let j = 0; j < columns; j++) {
        this.field[i][j] = new BattleFieldCell();
      }
    }
  }

  public highlightPossibleCellsToMove = (unit: Unit) => {
    this.unhighlighteAll();
    const cells: Array<BattleFieldCell> = [];
    const { x, y } = unit.getPosition();
    const field = this.field;
    const validateCell = (cell?: BattleFieldCell) => {
      if (!cell) {
        return false;
      }
      const item = cell.getItem();
      if (!item) {
        return true;
      } else {
        if (item.isAlive()) {
          return false;
        } else {
          return true;
        }
      }
    };

    const validateAndPush = (cell: BattleFieldCell) => {
      if (validateCell(cell)) {
        cells.push(cell);
      }
    };

    if (field[x - 1]) {
      validateAndPush(field[x - 1][y - 1]);
      validateAndPush(field[x - 1][y]);
      validateAndPush(field[x - 1][y + 1]);
    }
    if (field[x + 1]) {
      validateAndPush(field[x + 1][y + 1]);
      validateAndPush(field[x + 1][y]);
      validateAndPush(field[x + 1][y - 1]);
    }
    validateAndPush(field[x][y + 1]);
    validateAndPush(field[x][y - 1]);

    cells.forEach(cell => {
      cell.setHighlight(true);
    });
  };

  public moveUnit = (unit: Unit, x: number, y: number) => {
    const from = this.getCellByUnit(unit);
    const cell = this.field[x][y];
    if (cell.isHighlighted()) {
      const _unit = from.getItem();
      if (_unit) {
        _unit.setPosition(x, y);
        cell.setItem(_unit);
        from.setItem(null);
      }
    }
    this.unhighlighteAll();
  };

  public unhighlighteAll = () => {
    this.field.forEach(row => {
      row.forEach(cell => {
        cell.setHighlight(false);
      });
    });
  };

  public getField = () => {
    return this.field;
  };

  public getCellByUnit = (unit: Unit) => {
    const { x, y } = unit.getPosition();

    return this.field[x][y];
  };

  public getRows = () => {
    return this.rows;
  };

  public getColumns = () => {
    return this.columns;
  };
}

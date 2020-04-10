import { Unit, UNIT_TYPES } from '../Units';
import Team from '../Team';
import BattleField, { BattleFieldCell } from '../BattleField';

class Battle {
  private firstTeam: Team;
  private secondTeam: Team;
  private battleField: BattleField;
  private currentTeam: Team;
  private globalTeam: Team;

  public constructor(
    battlefield: BattleField,
    firstTeam: Team,
    secondTeam: Team,
  ) {
    this.firstTeam = firstTeam;
    this.secondTeam = secondTeam;
    this.currentTeam = firstTeam;
    this.battleField = battlefield;
    this.initialPlaceUnits();
    this.firstTeam.sortUnits();
    this.secondTeam.sortUnits();
    this.globalTeam = new Team(
      [...firstTeam.getUnits(), ...secondTeam.getUnits()],
      'white',
    );
    this.globalTeam.sortUnits();
  }

  public turn = () => {
    this.battleField.unhighlighteAll();
    const curUnit = this.globalTeam.getNext();
    if (curUnit === null) {
      this.globalTeam.getUnits().forEach(_unit => {
        _unit.setParalyzed(false);
      });
      this.globalTeam.getUnits().forEach(_unit => {
        _unit.setDefending(false);
      });
      this.globalTeam.sortUnits();
    }
  };

  public getFirstTeam = () => {
    return this.firstTeam;
  };

  public getSecondTeam = () => {
    return this.secondTeam;
  };

  public getCurrentTeam = () => {
    return this.currentTeam;
  };

  public getGlobalTeam = () => {
    return this.globalTeam;
  };

  public changeCurrentTeam = () => {
    if (this.currentTeam === this.firstTeam) {
      this.currentTeam = this.secondTeam;
    } else if (this.currentTeam === this.secondTeam) {
      this.currentTeam = this.firstTeam;
    }
  };

  public getTeamByUnit = (unit: Unit) => {
    if (this.firstTeam.isUnitFromTeam(unit)) {
      return this.firstTeam;
    } else {
      return this.secondTeam;
    }
  };

  public getAnotherTeamByUnit = (unit: Unit) => {
    return this.getTeamByUnit(unit) === this.firstTeam
      ? this.secondTeam
      : this.firstTeam;
  };

  // TODO: refactor
  public initialPlaceUnits = () => {
    const field = this.battleField.getField();
    let fUnitsCount = this.firstTeam.getUnits().length - 1;
    let sUnitsCount = this.secondTeam.getUnits().length - 1;
    let skipCount =
      field.length * field[0].length - (fUnitsCount + sUnitsCount) - 2;

    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        if (fUnitsCount > -1) {
          const fUnit = this.firstTeam.getNext();
          if (fUnit) {
            fUnit.setPosition(i, j);
            field[i][j].setItem(fUnit);
            fUnitsCount -= 1;
          }
        } else {
          if (skipCount) {
            skipCount -= 1;
          } else {
            const sUnit = this.secondTeam.getNext();
            if (sUnit) {
              sUnit.setPosition(i, j);
              field[i][j].setItem(sUnit);
              sUnitsCount -= 1;
            }
          }
        }
      }
    }
  };

  public getBattleField = () => {
    return this.battleField;
  };

  public highlightPossibleCellsToAction = (unit: Unit) => {
    this.battleField.unhighlighteAll();
    const unitTeam = this.getTeamByUnit(unit);
    const { x, y } = unit.getPosition();
    const field = this.battleField.getField();
    let cells: Array<BattleFieldCell> = [];

    switch (unit.getType()) {
      case UNIT_TYPES.MELEE:
        if (field[x - 1]) {
          cells.push(field[x - 1][y - 1]);
          cells.push(field[x - 1][y]);
          cells.push(field[x - 1][y + 1]);
        }
        if (field[x + 1]) {
          cells.push(field[x + 1][y + 1]);
          cells.push(field[x + 1][y]);
          cells.push(field[x + 1][y - 1]);
        }

        cells.push(field[x][y + 1]);
        cells.push(field[x][y - 1]);

        cells = cells.filter(cell => {
          try {
            const res =
              cell.getItem() !== null &&
              this.getTeamByUnit(cell.getItem()!) !== unitTeam;
            return res;
          } catch (e) {
            console.log(e);
            console.log(cell);
            return false;
          }
        });
        break;
      case UNIT_TYPES.HEALER:
        unitTeam.getUnits().forEach(_unit => {
          cells.push(field[_unit.getPosition().x][_unit.getPosition().y]);
        });
        break;
      default:
        this.getAnotherTeamByUnit(unit)
          .getUnits()
          .forEach(_unit => {
            cells.push(field[_unit.getPosition().x][_unit.getPosition().y]);
          });
        break;
    }

    cells.forEach(cell => {
      if (cell && cell.getItem() && cell.getItem()!.isAlive()) {
        cell.setHighlight(true);
      }
    });
  };
}

export default Battle;

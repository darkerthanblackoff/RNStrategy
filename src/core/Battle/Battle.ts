import _ from 'lodash';
import Team from '../Team';
import BattleField from '../BattleField';

class Battle {
  private firstTeam: Team;
  private secondTeam: Team;
  private battleField: BattleField;
  private currentTeam: Team;

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
  }

  public getFirstTeam = () => {
    return this.firstTeam;
  };

  public getSecondTeam = () => {
    return this.secondTeam;
  };

  public getCurrentTeam = () => {
    return this.currentTeam;
  };

  public changeCurrentTeam = () => {
    if (this.currentTeam === this.firstTeam) {
      this.currentTeam = this.secondTeam;
    } else if (this.currentTeam === this.secondTeam) {
      this.currentTeam = this.firstTeam;
    }
  };

  private getUnit = (team: Team, index: number) => {
    return team.getUnits()[index];
  };

  public initialPlaceUnits = () => {
    let field = this.battleField.getField();
    let fUnitsCount = this.firstTeam.getUnits().length - 1;

    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        if (fUnitsCount > -1) {
          let fUnit = this.firstTeam.getNext(true);
          if (fUnit) {
            fUnit.setPosition(i, j);
            this.battleField.getField()[i][j].setItem(fUnit);
            fUnitsCount -= 1;
          } else {
            fUnitsCount = -1;
          }
        }
      }
    }
  };

  public getBattleField = () => {
    return this.battleField;
  };
}

export default Battle;

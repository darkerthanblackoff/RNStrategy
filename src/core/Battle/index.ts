import Team from '../Team';
import BattleField from '../BattleField';

class Battle {
  private firstTeam: Team;
  private secondTeam: Team;
  private battleField: BattleField;

  public constructor(
    battlefield: BattleField,
    firstTeam: Team,
    secondTeam: Team,
  ) {
    this.firstTeam = firstTeam;
    this.secondTeam = secondTeam;
    this.battleField = battlefield;
  }
}

export default Battle;

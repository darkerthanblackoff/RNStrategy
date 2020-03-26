import Unit, { UNIT_TYPES } from '../Unit';
import Action from '../Action';

class ParalyzerUnit extends Unit {
  public constructor(
    name: string,
    health: number,
    damage: number,
    initiative: number,
  ) {
    super(name, UNIT_TYPES.PARALYZER, health, damage, initiative);

    const paralyzeAction = new Action<Unit>(enemy => {
      enemy.setParalyzed(true);
    });

    super.getActions().delete('Attack');
    super.addAction('Paralyze', paralyzeAction);
  }
}

export default ParalyzerUnit;

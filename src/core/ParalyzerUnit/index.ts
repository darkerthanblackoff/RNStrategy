import Unit, { UNIT_TYPES } from '../Unit';
import { IParalyzable } from '../interfaces';
import Target from '../Target';

class ParalyzerUnit extends Unit {
  public constructor(
    name: string,
    health: number,
    damage: number,
    initiative: number,
  ) {
    super(name, UNIT_TYPES.PARALYZER, health, damage, initiative);
  }

  public action(enemy: Target) {
    enemy.execute((_enemy: IParalyzable) => {
      _enemy.setParalyzed(true);
    });
  }
}

export default ParalyzerUnit;

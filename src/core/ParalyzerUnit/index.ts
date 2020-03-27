import Unit, { UNIT_TYPES } from '../Unit';
import { ITarget, IParalyzable } from '../interfaces';

class ParalyzerUnit extends Unit {
  public constructor(
    name: string,
    health: number,
    damage: number,
    initiative: number,
  ) {
    super(name, UNIT_TYPES.PARALYZER, health, damage, initiative);
  }

  public action(enemy: ITarget<IParalyzable>) {
    enemy.execute(_enemy => {
      _enemy.setParalyzed(true);
    });
  }
}

export default ParalyzerUnit;

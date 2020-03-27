import Unit, { UNIT_TYPES } from '../Unit';
import { ITarget, IDamageDealable } from '../../interfaces';

class HealerUnit extends Unit {
  public constructor(
    name: string,
    health: number,
    damage: number,
    initiative: number,
  ) {
    super(name, UNIT_TYPES.HEALER, health, damage, initiative);
  }

  public action(comrade: ITarget<IDamageDealable>) {
    comrade.execute(_comrade => {
      _comrade.dealDamage(this.damage * -1);
    });
  }
}

export default HealerUnit;

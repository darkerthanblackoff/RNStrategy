import Unit, { UNIT_TYPES } from '../Unit';
import { IDamageDealable } from '../interfaces';
import Target from '../Target';

class HealerUnit extends Unit {
  public constructor(
    name: string,
    health: number,
    damage: number,
    initiative: number,
  ) {
    super(name, UNIT_TYPES.HEALER, health, damage, initiative);
  }

  public action(comrade: Target) {
    comrade.execute((_comrade: IDamageDealable) => {
      _comrade.dealDamage(this.damage * -1);
    });
  }
}

export default HealerUnit;

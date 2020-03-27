import Unit, { UNIT_TYPES } from '../Unit';
import Target from '../Target';
import { IDamageDealable } from '../interfaces';

class MageUnit extends Unit {
  public constructor(
    name: string,
    health: number,
    damage: number,
    initiative: number,
  ) {
    super(name, UNIT_TYPES.MAGE, health, damage, initiative);
  }

  public action(targets: Target) {
    targets.executeForAll((target: IDamageDealable) => {
      target.dealDamage(this.damage);
    });
  }
}

export default MageUnit;

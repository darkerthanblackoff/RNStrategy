import Unit, { UNIT_TYPES } from '../Unit';
import { ITarget, IDamageDealable } from '../interfaces';

class MageUnit extends Unit {
  public constructor(
    name: string,
    health: number,
    damage: number,
    initiative: number,
  ) {
    super(name, UNIT_TYPES.MAGE, health, damage, initiative);
  }

  public action(targets: ITarget<IDamageDealable>) {
    targets.executeForAll(target => {
      target.dealDamage(this.damage);
    });
  }
}

export default MageUnit;

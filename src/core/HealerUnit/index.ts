import Unit, { UNIT_TYPES } from '../Unit';
import Action from '../Action';

class HealerUnit extends Unit {
  public constructor(
    name: string,
    health: number,
    damage: number,
    initiative: number,
  ) {
    super(name, UNIT_TYPES.HEALER, health, damage, initiative);

    const healAction = new Action<Unit>(comrade => {
      comrade.dealDamage(this.damage * -1);
    });

    super.getActions().delete('Attack');
    super.addAction('Heal', healAction);
  }
}

export default HealerUnit;

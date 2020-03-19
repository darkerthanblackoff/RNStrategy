import Unit, { UNIT_TYPES } from '../Unit';

class HealerUnit extends Unit {
  public constructor(health: number, damage: number, initiative: number) {
    super(UNIT_TYPES.HEALER, health, damage, initiative);
  }

  public attack(comrade: Unit) {
    comrade.addHealth(this.damage);
  }
}

export default HealerUnit;

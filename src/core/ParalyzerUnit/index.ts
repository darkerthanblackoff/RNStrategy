import Unit, { UNIT_TYPES } from '../Unit';

class ParalyzerUnit extends Unit {
  public constructor(health: number, damage: number, initiative: number) {
    super(UNIT_TYPES.PARALYZER, health, damage, initiative);
  }

  public attack(comrade: Unit) {
    comrade.setParalyzed(true);
  }
}

export default ParalyzerUnit;

import Unit, { UNIT_TYPES } from '../Unit';
import MageUnit from '../MageUnit';
import HealerUnit from '../HealerUnit';
import ParalyzerUnit from '../ParalyzerUnit';

export enum UNIT_NAMES {
  SKELETON = 'Skeleton',
  CENTAUR = 'Centaur',
  BANDIT = 'Bandit',
  ELF_ARCHER = 'Elf Archer',
  SKELETON_MAGE = 'Skeleton Mage',
  ARCHIMAGE = 'Archimage',
  MONK = 'Monk',
  SIRENA = 'Sirena',
}

export type UnitName = UNIT_NAMES;

class UntiFactory {
  public create(unitName: UnitName) {
    switch (unitName) {
      case UNIT_NAMES.SKELETON:
        return new Unit(UNIT_NAMES.SKELETON, UNIT_TYPES.MELEE, 100, 25, 50);
      case UNIT_NAMES.CENTAUR:
        return new Unit(UNIT_NAMES.CENTAUR, UNIT_TYPES.MELEE, 150, 50, 50);
      case UNIT_NAMES.BANDIT:
        return new Unit(UNIT_NAMES.BANDIT, UNIT_TYPES.RANGE, 45, 30, 60);
      case UNIT_NAMES.ELF_ARCHER:
        return new Unit(UNIT_NAMES.ELF_ARCHER, UNIT_TYPES.RANGE, 90, 40, 60);
      case UNIT_NAMES.SKELETON_MAGE:
        return new MageUnit(UNIT_NAMES.SKELETON_MAGE, 50, 20, 40);
      case UNIT_NAMES.ARCHIMAGE:
        return new MageUnit(UNIT_NAMES.ARCHIMAGE, 90, 40, 40);
      case UNIT_NAMES.MONK:
        return new HealerUnit(UNIT_NAMES.MONK, 70, 40, 20);
      case UNIT_NAMES.SIRENA:
        return new ParalyzerUnit(UNIT_NAMES.SIRENA, 80, 0, 20);
    }
  }
}

export default UntiFactory;

import { Battle, BattleField, Team } from '../src/core';
import { UNIT_NAMES, UNIT_TYPES, UnitFactory, Unit } from '../src/core/Units';

const unitsList = [
  UNIT_NAMES.SKELETON,
  UNIT_NAMES.SKELETON_MAGE,
  UNIT_NAMES.ARCHIMAGE,
  UNIT_NAMES.BANDIT,
  UNIT_NAMES.MONK,
];

const unitFactory = new UnitFactory();

const getRandomUnitsSet = (count: number) => {
  const units: Array<Unit> = [];
  for (let i = 0; i < count; i++) {
    const rand = Math.floor(Math.random() * (unitsList.length - 1 - 0 + 1)) + 0;
    units.push(unitFactory.create(unitsList[rand]));
  }

  return units;
};

test('BF', () => {
  const first = new Team(getRandomUnitsSet(5), 'blue');
  first.addUnit(new Unit('FIRST', UNIT_TYPES.MELEE, 100, 100, 1000));
  const second = new Team(getRandomUnitsSet(6), 'red');
  const battleField = new BattleField(5, 6);
  const battle = new Battle(battleField, first, second);

  // console.log(battle.getTeamByUnit(second.getUnits()[0]) === second);
  // console.log(battle.getTeamByUnit(second.getUnits()[0]) === first);
  // console.log(second.isUnitFromTeam(second.getUnits()[0]));
  // console.log(first.isUnitFromTeam(second.getUnits()[0]));
});

import Team from '../src/core/Team';
import { UnitFactory, UNIT_NAMES, Unit, UNIT_TYPES } from '../src/core/Units';

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

test('HZ', () => {
  const blue = new Team(getRandomUnitsSet(5), 'blue');
  blue.addUnit(new Unit('name', UNIT_TYPES.MELEE, 0, 0, 10));

  const red = new Team(getRandomUnitsSet(6), 'red');
  const deads = new Team(
    Array(6).fill(new Unit('name', UNIT_TYPES.MELEE, 0, 0, 10)),
    'black',
  );

  // console.log(red);
  // let current = null;
  // let i = 1;
  // while ((current = red.getNext())) {
  //   console.log(i);
  //   console.log(current);
  //   i += 1;
  // }
  // console.log(red.hasAlive());
  // console.log(deads.hasAlive());
});

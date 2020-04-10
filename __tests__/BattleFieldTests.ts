import Team from '../src/core/Team';
import Battle from '../src/core/Battle';
import BattleField from '../src/core/BattleField';
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

test('HZ2', () => {
  const blue = new Team(getRandomUnitsSet(5), 'blue');
  blue.addUnit(new Unit('name', UNIT_TYPES.MELEE, 0, 0, 10));
  const red = new Team(getRandomUnitsSet(6), 'red');
  const field = new BattleField(5, 6);
  const battle = new Battle(field, blue, red);
  // console.log(field.getField()[field.getField().length - 1]);
});

test('HZ3', () => {
  const first = Array(6).fill(1);
  const second = Array(6).fill(2);
  let firstCount = first.length - 1;
  let secondCount = second.length - 1;

  let field: Array<Array<number>> = Array(5).fill(Array(6).fill(0));

  let skipCount =
    field.length * field[0].length - (firstCount + 1 + (secondCount + 1)) + 1;

  console.log(skipCount);
  field = field.map(row => {
    return row.map(cell => {
      let unit = first[firstCount];
      if (firstCount >= 0) {
        cell = unit;
        firstCount -= 1;
      }
      if (skipCount >= 0 && firstCount === -1) {
        skipCount -= 1;
      }
      if (skipCount === -1 && secondCount >= 0) {
        unit = second[secondCount];
        cell = unit;
        secondCount -= 1;
      }

      return cell;
    });
  });
});

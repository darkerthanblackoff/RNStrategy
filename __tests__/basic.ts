// import Unit, { UNIT_TYPES } from '../src/core/Unit';
import UnitFactory, { UNIT_NAMES } from '../src/core/UnitFactory';

const unitFactory = new UnitFactory();

test('Monk heal centaur', () => {
  const centaur = unitFactory.create(UNIT_NAMES.CENTAUR);
  const monk = unitFactory.create(UNIT_NAMES.MONK);

  centaur.dealDamage(monk.getDamage());
  const action = monk.getActions().get('Heal');
  if (action) {
    action.execute(centaur);
  }

  expect(centaur.getHealth()).toBe(centaur.getMaxHealth());
});

test('hz', () => {
  const centaur = unitFactory.create(UNIT_NAMES.CENTAUR);
  const monk = unitFactory.create(UNIT_NAMES.MONK);
  const sirena = unitFactory.create(UNIT_NAMES.SIRENA);

  console.log(centaur.getActions().entries());
  console.log(monk.getActions().entries());
  console.log(sirena.getActions().entries());

  expect(true).toBe(true);
});

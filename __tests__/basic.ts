// import Unit, { UNIT_TYPES } from '../src/core/Unit';
import UnitFactory, { UNIT_NAMES } from '../src/core/UnitFactory';

const unitFactory = new UnitFactory();

test('centaur beats bandit', () => {
  const centaur = unitFactory.create(UNIT_NAMES.CENTAUR);
  const bandit = unitFactory.create(UNIT_NAMES.BANDIT);

  centaur.attack(bandit);

  expect(bandit.isAlive()).toBe(false);
});

test('bandit cant kill centaur by one attack', () => {
  const centaur = unitFactory.create(UNIT_NAMES.CENTAUR);
  const bandit = unitFactory.create(UNIT_NAMES.BANDIT);

  bandit.attack(centaur);

  expect(centaur.isAlive()).toBe(true);
});

test('centaur with monk vs bandit', () => {
  const centaur = unitFactory.create(UNIT_NAMES.CENTAUR);
  const monk = unitFactory.create(UNIT_NAMES.MONK);
  const centaurPreHealHealth = centaur.getHealth();

  const bandit = unitFactory.create(UNIT_NAMES.BANDIT);

  bandit.attack(centaur);
  monk.attack(centaur);

  expect(centaur.getHealth()).toBe(
    centaurPreHealHealth - bandit.getDamage() + monk.getDamage(),
  );
});

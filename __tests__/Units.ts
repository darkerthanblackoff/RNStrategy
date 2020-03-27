import { Unit, UNIT_TYPES, MageUnit, HealerUnit } from '../src/core/Units';
import Target from '../src/core/Target';

test('Basic unit can attack only single target', () => {
  const unit = new Unit('Simple Unit', UNIT_TYPES.MELEE, 100, 10, 10);
  const targetUnit = new Unit('Simple Unit', UNIT_TYPES.MELEE, 100, 10, 10);
  const targetUnit2 = new Unit('Simple Unit', UNIT_TYPES.MELEE, 100, 10, 10);

  unit.action(new Target([targetUnit, targetUnit2]));

  expect(targetUnit.getHealth()).toBe(
    targetUnit.getMaxHealth() - unit.getDamage(),
  );

  expect(targetUnit2.getHealth()).toBe(targetUnit2.getMaxHealth());
});

test('Mage can attack multiple targets', () => {
  const mage = new MageUnit('Simple Unit', 100, 10, 10);
  const targetUnit = new Unit('Simple Unit', UNIT_TYPES.MELEE, 100, 10, 10);
  const targetUnit2 = new Unit('Simple Unit', UNIT_TYPES.MELEE, 100, 10, 10);

  mage.action(new Target([targetUnit, targetUnit2]));

  expect(targetUnit.getHealth()).toBe(
    targetUnit.getMaxHealth() - mage.getDamage(),
  );

  expect(targetUnit2.getHealth()).toBe(
    targetUnit2.getMaxHealth() - mage.getDamage(),
  );
});

test('Healer heal only one target', () => {
  const healer = new HealerUnit('Simple Healer', 100, 20, 20);
  const teammate1 = new Unit('Simple teammate', UNIT_TYPES.MELEE, 100, 10, 10);
  const teammate2 = new Unit('Simple teammate', UNIT_TYPES.MELEE, 100, 10, 10);
  const damage = 20;

  teammate1.dealDamage(damage);
  teammate2.dealDamage(damage);

  healer.action(new Target([teammate1, teammate2]));

  expect(teammate1.getHealth()).toBe(
    teammate1.getMaxHealth() - damage + healer.getDamage(),
  );

  expect(teammate2.getHealth()).toBe(teammate2.getMaxHealth() - damage);
});

test('Paralyzer can paralyze only one target', () => {});

// import BattleField from '../src/core/BattleField';
import Unit, { UNIT_TYPES } from '../src/core/Unit';
import MageUnit from '../src/core/MageUnit';
import Target from '../src/core/Target';

// test('init BattleField', () => {
//   const battleField = new BattleField(5, 6);
//   console.log(battleField.getField());
//   console.log('lol');
// });

test('Attack single target', () => {
  const unit = new Unit('Simple Unit', UNIT_TYPES.MELEE, 100, 10, 10);
  const targetUnit = new Unit('Simple Unit', UNIT_TYPES.MELEE, 100, 10, 10);
  const targetUnit2 = new Unit('Simple Unit', UNIT_TYPES.MELEE, 100, 10, 10);

  unit.action(new Target([targetUnit, targetUnit2]));

  expect(targetUnit.getHealth()).toBe(
    targetUnit.getMaxHealth() - unit.getDamage(),
  );

  expect(targetUnit2.getHealth()).toBe(targetUnit2.getMaxHealth());
});

test('Attack multiple targets', () => {
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

export enum UNIT_TYPES {
  MELEE = 'melee',
  RANGE = 'range',
  MAGE = 'mage',
  HEALER = 'healer',
  PARALYZER = 'paralyzer',
}

export type UnitType = UNIT_TYPES;

class Unit {
  protected type: UnitType;
  protected health: number;
  protected damage: number;
  protected initiative: number;
  protected paralyzed: boolean;
  protected defending: boolean;

  public constructor(
    type: UnitType,
    health: number,
    damage: number,
    initiative: number,
  ) {
    this.type = type;
    this.health = health;
    this.damage = damage;
    this.initiative = initiative;
    this.paralyzed = false;
    this.defending = false;
  }

  public attack(enemy: Unit) {
    enemy.subHealth(this.damage);
  }

  public getType() {
    return this.type;
  }

  public getHealth() {
    return this.health;
  }

  public subHealth(value: number) {
    if (value <= 0) {
      throw Error(
        `Can't sub ${value} health! Value must be positive non-zero value!`,
      );
    }

    this.health -= this.defending ? value / 2 : value;
  }

  public addHealth(value: number) {
    if (value <= 0) {
      throw Error(
        `Can't add ${value} health! Value must be positive non-zero value!`,
      );
    }

    this.health += value;
  }

  public getDamage() {
    return this.damage;
  }

  public getInitiative() {
    return this.initiative;
  }

  public isAlive() {
    return this.health >= 0;
  }

  public isParalyzed() {
    return this.paralyzed;
  }

  public setParalyzed(value: boolean) {
    this.paralyzed = value;
  }

  public isDefending() {
    return this.defending;
  }

  public setDefending(value: boolean) {
    this.defending = value;
  }
}

export default Unit;

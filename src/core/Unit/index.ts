import Action from '../Action';
export enum UNIT_TYPES {
  MELEE = 'melee',
  RANGE = 'range',
  MAGE = 'mage',
  HEALER = 'healer',
  PARALYZER = 'paralyzer',
}

export type UnitType = UNIT_TYPES;

class Unit {
  protected name: string;
  protected type: UnitType;
  protected maxHealth: number;
  protected health: number;
  protected damage: number;
  protected initiative: number;
  protected paralyzed: boolean;
  protected defending: boolean;
  protected actions: Map<string, Action<any>>;
  protected x: number;
  protected y: number;

  public constructor(
    name: string,
    type: UnitType,
    health: number,
    damage: number,
    initiative: number,
  ) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.maxHealth = health;
    this.damage = damage;
    this.initiative = initiative;
    this.paralyzed = false;
    this.defending = false;
    this.x = 0;
    this.y = 0;
    this.actions = new Map();
    this.actions.set(
      'Defend',
      new Action<void>(() => {
        this.defending = true;
      }),
    );
    this.actions.set(
      'Attack',
      new Action<Unit>(enemy => {
        enemy.dealDamage(this.damage);
      }),
    );
    this.actions.set(
      'Move',
      new Action<{ x: number; y: number }>(({ x, y }) => {
        this.x = x;
        this.y = y;
      }),
    );
  }

  public addAction(name: string, action: Action<any>) {
    if (this.actions.has(name)) {
      throw Error(`${this.type} already have action "${name}"`);
    }

    this.actions.set(name, action);
  }

  public getType() {
    return this.type;
  }

  public getHealth() {
    return this.health;
  }

  public dealDamage(damage: number) {
    if (damage < 0 && this.health - damage > this.maxHealth) {
      this.health = this.maxHealth;
    } else {
      this.health -= damage;
    }
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

  public getShortName() {
    const words = this.name.split(' ');
    return words.length > 1
      ? words.map(word => word[0].toUpperCase()).toString()
      : words[0][0];
  }

  public getActions() {
    return this.actions;
  }

  public getMaxHealth() {
    return this.maxHealth;
  }
}

export default Unit;

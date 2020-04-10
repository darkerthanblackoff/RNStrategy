import { ITarget, IDamageDealable } from '../../interfaces';

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
  }

  public action(target: ITarget<any>) {
    target.execute((_target: IDamageDealable) => {
      _target.dealDamage(this.damage);
    });
  }

  public getType = () => {
    return this.type;
  };

  public getHealth = () => {
    return this.health;
  };

  public dealDamage = (damage: number) => {
    if (damage < 0 && this.health - damage > this.maxHealth) {
      this.health = this.maxHealth;
    } else {
      this.health -= this.defending ? damage / 2 : damage;
    }
    if (this.health < 0) {
      this.health = 0;
    }
    this.defending = false;
  };

  public getDamage = () => {
    return this.damage;
  };

  public getInitiative = () => {
    return this.initiative;
  };

  public isAlive = () => {
    return this.health > 0;
  };

  public isParalyzed = () => {
    return this.paralyzed;
  };

  public setParalyzed = (value: boolean) => {
    if (this.defending && !value) {
      return;
    }
    this.paralyzed = value;
  };

  public isDefending = () => {
    return this.defending;
  };

  public setDefending = (value: boolean) => {
    this.defending = value;
  };

  public getShortName = () => {
    if (!this.isAlive()) {
      return 'X';
    }

    const words = this.name.split(' ');

    return words.length > 1
      ? words
          .map(word => word[0].toUpperCase())
          .toString()
          .replace(',', '')
      : words.toString().slice(0, 2);
  };

  public getMaxHealth = () => {
    return this.maxHealth;
  };

  public setX = (x: number) => {
    if (x < 0) {
      throw Error('Value must be positive number!');
    }
    this.x = x;
  };

  public setY = (y: number) => {
    if (y < 0) {
      throw Error('Value must be positive number!');
    }
    this.y = y;
  };

  public setPosition = (x: number, y: number) => {
    if (x < 0 || y < 0) {
      throw Error('Values must be positive number!');
    }
    this.x = x;
    this.y = y;
  };

  public getPosition = () => {
    return { x: this.x, y: this.y };
  };
}

export default Unit;

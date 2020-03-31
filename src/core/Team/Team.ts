import { Unit } from '../Units';

class Team {
  private units: Array<Unit>;
  private currentUnit: number;
  private color: string;

  public constructor(units: Array<Unit>, color: string) {
    this.units = units;
    this.color = color;
    this.currentUnit = 0;
  }

  public getColor = () => {
    return this.color;
  };

  public sortUnits = () => {
    return this.units.sort((a, b) => {
      if (a.isAlive() && !b.isAlive()) {
        return -1;
      }
      if (!a.isAlive() && b.isAlive()) {
        return 1;
      }
      if (a.getInitiative() === b.getInitiative()) {
        // Generates random int between -10 and 10.
        return Math.floor(Math.random() * (10 - -10 + 10)) + -10;
      } else {
        return b.getInitiative() - a.getInitiative();
      }
    });
  };

  public addUnit = (unit: Unit) => {
    this.units.push(unit);
  };

  public getNext = (init?: boolean): Unit | null => {
    if (this.currentUnit === this.units.length || !this.hasAlive()) {
      this.currentUnit = 0;
      return null;
    } else {
      if (!this.units[this.currentUnit].isAlive() && !init) {
        this.currentUnit += 1;
        return null;
      }
      this.currentUnit += 1;
      return this.units[this.currentUnit - 1];
    }
  };

  public hasAlive = () => {
    let hasAlive = false;
    this.units.forEach(unit => {
      if (unit.isAlive()) {
        hasAlive = true;
      }
    });

    return hasAlive;
  };

  public getUnits = () => {
    return this.units;
  };
}

export default Team;

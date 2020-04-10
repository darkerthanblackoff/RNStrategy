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

  public getNext = (): Unit | null => {
    let unit: Unit | null = this.units[this.currentUnit];

    this.currentUnit += 1;
    if (this.currentUnit - 1 === this.units.length) {
      this.currentUnit = 0;
      return null;
    }
    if (
      this.units[this.currentUnit] &&
      (!this.units[this.currentUnit].isAlive() ||
        this.units[this.currentUnit].isParalyzed())
    ) {
      unit = this.getNext();
    }

    return unit;
  };

  public getCurrent = () => {
    return this.units[this.currentUnit];
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

  public isUnitFromTeam = (unit: Unit) => {
    let answer = false;
    this.units.forEach(_unit => {
      if (_unit === unit) {
        answer = true;
      }
    });

    return answer;
  };

  public turnEnd = () => {
    this.units.forEach(unit => {
      unit.setDefending(false);
    });
  };
}

export default Team;

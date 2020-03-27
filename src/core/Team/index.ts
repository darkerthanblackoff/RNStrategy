import { Unit } from '../Units';

class Team {
  private units: Array<Unit>;

  public constructor(units?: Array<Unit>) {
    this.units = units || [];
  }

  public getUnits() {
    return this.units;
  }

  public addUnit(unit: Unit) {
    this.units.push(unit);
  }
}

export default Team;

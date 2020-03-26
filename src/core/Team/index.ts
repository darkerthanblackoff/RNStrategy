import Unit from '../Unit';

class Team {
  private units: Array<Unit>;

  public constructor(units?: Array<Unit>) {
    this.units = units || [];
  }

  public getUnits() {
    return this.units;
  }
}

export default Team;

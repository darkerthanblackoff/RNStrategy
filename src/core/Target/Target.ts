class Target {
  private targets: any;

  public constructor(targets: any) {
    this.targets = targets;
  }

  public execute(action: (target: any) => void) {
    if (Array.isArray(this.targets)) {
      action(this.targets[0]);
    } else {
      action(this.targets);
    }
  }

  public executeForAll(action: (target: any) => void) {
    if (Array.isArray(this.targets)) {
      this.targets.forEach(_target => action(_target));
    } else {
      action(this.targets);
    }
  }
}

export default Target;

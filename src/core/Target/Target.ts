class Target<T> {
  private targets: T | T[];

  public constructor(targets: T | T[]) {
    this.targets = targets;
  }

  public execute(action: (target: T) => void) {
    if (Array.isArray(this.targets)) {
      action(this.targets[0]);
    } else {
      action(this.targets);
    }
  }

  public executeForAll(action: (target: T) => void) {
    if (Array.isArray(this.targets)) {
      this.targets.forEach(_target => action(_target));
    } else {
      action(this.targets);
    }
  }
}

export default Target;

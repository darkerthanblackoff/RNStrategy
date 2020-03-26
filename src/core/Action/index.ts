class Action<T> {
  public execute: (props: T) => void;

  public constructor(actionFn: (props: T) => void) {
    this.execute = actionFn;
  }
}

export default Action;

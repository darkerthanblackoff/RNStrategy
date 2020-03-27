export interface ITarget<T> {
  execute: (action: (target: T) => void) => void;
  executeForAll: (action: (targets: T) => void) => void;
}

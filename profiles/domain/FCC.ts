export class FCC<T> {
  values: T[] = [];
  constructor(values: T[]) {
    this.values = values;
  }

  map<U>(transform: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
    return this.values.map(transform, thisArg);
  }
  forEach(predicate: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
    return this.values.forEach(predicate, thisArg);
  }
}

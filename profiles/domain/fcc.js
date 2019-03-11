exports.FCC = class FCC {
  constructor(values) {
    this.values = values;
  }

  map(transform) {
    return this.values.map(transform);
  }

  forEach(predicate) {
    return this.values.forEach(predicate);
  }
}

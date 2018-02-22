const CLASS_SYMBOL = Symbol('Thener');

export default class Thener {
  constructor(value) {
    if (value && value[CLASS_SYMBOL]) {
      this[CLASS_SYMBOL] = {
        value: value[CLASS_SYMBOL].value,
        error: value[CLASS_SYMBOL].error,
      };
    } else {
      this[CLASS_SYMBOL] = {
        value,
        error: [],
      };
    }
  }

  get value() {
    return this[CLASS_SYMBOL].value;
  }

  set value(e) {
    return this[CLASS_SYMBOL].value;
  }

  get error() {
    return this[CLASS_SYMBOL].error.length !== 0;
  }

  set error(e) {
    return this[CLASS_SYMBOL].error.length !== 0;
  }

  then(func) {
    if (typeof func !== 'function') return new Thener(this);

    try {
      const val = func(this[CLASS_SYMBOL].value);
      const ret = new Thener(val);
      ret[CLASS_SYMBOL].error = this[CLASS_SYMBOL].error;
      return ret;
    } catch (e) {
      this[CLASS_SYMBOL].error.push(e);
      return new Thener(this);
    }
  }

  catch(func) {
    if (typeof func !== 'function') return new Thener(this);
    this[CLASS_SYMBOL].error.map(e => func(e));
    return new Thener(this);
  }

  finally(func) {
    if (typeof func !== 'function') return new Thener(this);
    func();
    return new Thener(this[CLASS_SYMBOL].value);
  }
}

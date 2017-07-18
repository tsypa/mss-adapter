'use strict';

class MSSAdapter {
  constructor(name, options) {
    if (this.constructor === MSSAdapter) {
      throw new Error(
        'class "MSSAdapter" cannot be instantiated directly');
    }
    this._options = Object.assign({}, options);
    this.purge = this.fetch = this.run;
    return eval(`new ${name}()`)
  }
};

module.exports = MSSAdapter;

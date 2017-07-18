'use strict';

class MSSAdapter {
  constructor(type, options) {
    const cls = require(`./lib/${type}.js`);
    return eval(`new ${cls}(options)`);
  }
};

module.exports = MSSAdapter;

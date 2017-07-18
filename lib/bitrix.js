'use strict';

const _ = require('lodash');
const got = require('got');
const MSSAdapter = require('./http-json.js');

class MSSBitrixAdapter extends MSSAdapter {
  constructor(options) {
    super(options);
  }

  moment(s) {
    const m = /(\d+).(\d+).(\d+)\s+(\d+).(\d+).(\d+)/gm.exec(s);

    if (m.length != 7) {
      return s;
    }

    const [ day, month, year, hour, minute, second ] = _.drop(m);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
};

module.exports = MSSBitrixAdapter;

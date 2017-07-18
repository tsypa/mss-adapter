'use strict';

const _ = require('lodash');
const MSSAdapter = require('./mss.js');

class MSSMySQLAdapter extends MSSAdapter {
  constructor(options) {
    super();
    this._options = Object.assign({}, options);
    this.purge = this.fetch = this.run;
  }

  run(p) {
    return new Promise((resolve, reject) => {
      const mysql = require('mysql');
      const noop = 'DO @';
      const conn = mysql.createConnection(this._options.connection);
      const stmt = _.isNull(p) ?  noop : p; // May be throw instead noop ?

      conn.query(stmt, (error, results, fields) => {
        if (error) {
          reject(error);
        }

        conn.destroy();
        resolve(results);

      });
    });
  };
};

module.exports = MSSMySQLAdapter;

'use strict';

const _ = require('lodash');
const got = require('got');

class MSSHTTPJSONAdapter {
  constructor(options) {
    this._options = Object.assign({}, options);
    this.purge = this.fetch = this.run;
  }

  // P - parameters (can be object for special handling)
  run(p) {
    const opts = _.clone(this._options.connection);

    if (_.isObjectLike(p)) {
      opts.path += '?' +
        _.join(_.map(_.entries(p), (o) => `${_.head(o)}=${_.drop(o)}`), '&');
      console.log(opts.path);
    }

    return got(opts).then((response) => {
      try {
        const o = JSON.parse(response.body);
        return Promise.resolve(o);
      } catch (error) {
        return Promise.reject(new Error(error));
      }
    }).catch((error) => {
      return Promise.reject(error);
    });
  };
};

module.exports = MSSHTTPJSONAdapter;

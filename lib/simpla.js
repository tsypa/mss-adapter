'use strict';

const _ = require('lodash');
const MSSAdapter = require('./mysql.js');

class MSSSimplaAdapter extends MSSAdapter {
  constructor(options) {
    super(options);
  }

  run(p) {
    return new Promise((resolve, reject) => {
      super.run(p).then((results) => {
        resolve(_.map(results, (r) => {
          const article = _.get(r, 'sku');
          const code = article;
          const externalCode = _.get(r, 'external_id');
          const name = _.get(r, 'name');
          const price = _.multiply(_.get(r, 'price'), 100);
          return { code, name, price, article, externalCode };
        }));
      }).catch((error) => {
        reject(error);
      });
    });
  };
};

module.exports = MSSSimplaAdapter;

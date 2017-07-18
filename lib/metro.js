/*
 * Адаптер metro, возвращает отсортированный массив
 * Типичный адаптер справочника
 */

'use strict';

const _ = require('lodash');
const got = require('got');
const MSSAdapter = require('./mss.js');

class MSSMetroAdapter extends MSSAdapter {
  constructor(options = {}) {
    super();
  }

  get(options) {
    return got(options).then((response) => {
      try {
        const o = JSON.parse(response.body);

        const stations = _.transform(_.get(o, 'lines'), (a, line) => {
          a.push(line.stations);
        }, []);

        return Promise.resolve(
          _.uniq(_.map(_.flatMap(stations), (station) => station.name)).sort());
      } catch (error) {
        return Promise.reject(new Error(error));
      }
    }).catch((error) => {
      return Promise.reject(error);
    });
  };
};

module.exports = MSSMetroAdapter;

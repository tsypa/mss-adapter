'use strict';

class Fabric {
  constructor(name, options) {
    return eval(`new ${name}(options)`);
  }
};

class C {
  constructor(options) {
    console.log(options);
  };
};


const c = new Fabric('C', {a: 5});

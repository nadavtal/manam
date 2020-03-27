;(function() {

  /**
   * App configuration inluding MongoDB, API route etc.
   */

  'use strict';

  module.exports = {
    db: {
      development: {
        url: 'Vm1.manam.co.il/apidev',
        port: 5000
      },
      test: {
        url: 'Vm1.manam.co.il/apitest',
        port: 5555
      },
      production: {
        url: 'Vm1.manam.co.il/apiprod',
        port: 5300
      },
    },
    secret: 'customSecret2016?!', // BEWARE: this should not goes into repository
    apiRoute: '/api/v1/',
  };

})();

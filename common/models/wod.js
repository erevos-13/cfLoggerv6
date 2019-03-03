'use strict';
const app = require('../../server/server'); //require `server.js` as in any node.js app

const _ = require('lodash');

module.exports = function(Wod) {






  /**
   * This is returns all the wods with resources.
   * @param {Function(Error, object)} callback
   */

  Wod.wodAll = function(callback) {
    let wodsDTO;
    // TODO
    let Resources = Wod.app.models.Resources;




    Wod.find({} ,function (err, wods){
      Resources.find({},function (err, resources) {
        if(err) {
          let error = new Error('empty value');
          error.status = 404;
          return callback(err);
        }

        try {

          wods.forEach((wod, index) => {
            console.log({wod: wod});
            const resourcesById = resources.find( id => id.itemId === wod.id);
            if(!_.isNil(resourcesById)){
              wod.resources = resourcesById.resourcesTypesIds;
            }else {
              wod.resources = null;
            }
          });

          callback(null, wods);
        }catch (e) {
          let error = new Error('Error in array');
          error.status = 402;
          return callback(err);

        }

      })
    });


  };



};

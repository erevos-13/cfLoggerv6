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
      console.log(wods);
      Resources.find({},function (err, resources) {
        console.log(resources);
        wods.forEach((wod, index) => {
          const resourcesById = resources.find( id => id.itemId === wod.id);
          wod.resources = resourcesById.resourcesTypesIds;
          console.log(wod);
        });

        callback(null, wods);
      })
    });


  };



};

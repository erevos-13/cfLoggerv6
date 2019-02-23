'use strict';

module.exports = function(Resources) {

  /**
   * This methods will give me the resources
   * @param {string} itemId The itemId of teh wod
   * @param {Function(Error, array)} callback
   */

  Resources.wodResources = function(itemId, callback) {
    let resources;
    // TODO i need to get the from resources the id
    console.log(itemId);
    Resources.find({where: {itemId: itemId}}, function (err, resourcesWod) {
      console.log(resourcesWod);
      callback(null, resourcesWod);
    });

  };


};

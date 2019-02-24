'use strict';
var _ = require('lodash');

module.exports = function (app) {
  const User = app.models.User;
  const Metadata = app.models.metadata;

  User.balances = function (msg, cb) {
    console.log(msg);


    cb(null, 'Greetings... ' - msg);
  };

  User.getUserProfile = function (userId, cb) {
    console.log(userId);
    var error = new Error("The error message");
    User.findById(userId, function (err, user_) {
      Metadata.find({fields: {itemId: userId, metadata: true}}, function (err, metadata) {
        try {
          if(err) {
            throw (err);
          }

          let metadataObj = {};
          metadata.forEach((metadatatum, index) => {
            metadataObj = Object.assign(metadatatum.metadata);
          });
          user_.metadata = metadataObj;
        }catch (e) {
          cb(error);
        }


        cb(null, user_);
      });

    })

  };


  User.remoteMethod(
    'getUserProfile', {
      accepts: {
        arg: 'userId',
        type: 'string',
        required: true,
      },
      returns: {
        arg: 'userDTO',
        type: 'object',
      },
      http: {
        path: '/getUserProfile',
        verb: 'get',
      }
    }
  );
  /**
   * @description get the user balances
   */
  User.remoteMethod(
    'balances', {
      accepts: {
        arg: 'userId',
        type: 'string',
        required: true,
      },
      returns: {
        arg: 'userBalances',
        type: 'object',
      },
      http: {
        path: '/balances',
        verb: 'get',
      },
    }
  );
};

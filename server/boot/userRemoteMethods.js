'use strict';
const _ = require('lodash');

module.exports = function (app) {
  const User = app.models.User;
  const Metadata = app.models.metadata;

  User.balances = function (msg, cb) {
    console.log(msg);


    cb(null, 'Greetings... ' - msg);
  };

  User.getUserProfile = function (userId, cb) {

    if (userId === null) {
      let error = new Error('empty value');
      error.status = 404;
      return cb(error);
    }

    Metadata.find({where: {itemId: userId}}, function (err, metadata) {

      try {
        if (err) {
          let error = new Error('Error');
          error.status = 500;
          return cb(error);
        }

        console.log({metadata: metadata});

        cb(null, metadata);
      } catch (e) {
        cb(e);
      }


    });

  };


  User.submitScore = function(userId_, wodId_, typeOfWod_, score_,cb) {
    console.log({userId: userId_,wodId:wodId_,typeOfWod: typeOfWod_,score:score_});
    User.create([{userId: userId_,wodId:wodId_,typeOfWod: typeOfWod_,score:score_}], function (err,data) {
      cb(null, data);
    });


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

  /**
   * @description remote method
   */
  User.remoteMethod(
    'submitScore', {
      accepts:
        [
          {arg: 'userId', type: 'string', required: true},
          {arg: 'wodId', required: true, type: "string"},
          {arg: 'typeOfWod',required:true, type:'number'},
          {arg: 'score',required:true,type:'string'}
        ],
      returns: {
        arg: 'wodDTO',
        type: 'object',
      },
      http: {
        path: '/submitScore',
        verb: 'post',
      }
    }
  );
};

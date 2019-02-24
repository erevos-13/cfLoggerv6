'use strict';
module.exports = function (app) {
  const User = app.models.User;
  const Metadata = app.models.metadata;

  User.balances = function (msg, cb) {
    console.log(msg);


    cb(null, 'Greetings... ' - msg);
  };

  User.getUserProfile = function (userId, cb) {
    console.log(userId);
    User.findById(userId, function (err, user_) {
      if(err) {
        throw err;
      }
      Metadata.find({fields: {itemId: userId, metadata: true}}, function (err, metadata) {
        console.log({user: user_});
        console.log({metadataUser: metadata});

        try {
          const metadataArray = [];
          metadata.forEach((metadatatum, index) => {
            metadataArray.push(metadatatum.metadata);
          });
          user_.metadata = metadataArray;
        }catch (e) {
          cb(e);
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

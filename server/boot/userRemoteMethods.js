module.exports = function (app) {
  const User = app.models.User;

  User.balances = function (msg, cb) {
    console.log(msg);


    cb(null, 'Greetings... ' - msg);
  };



















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

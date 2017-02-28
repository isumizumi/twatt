var express = require('express');
var router = express.Router();
var OAuth = require('oauth');
require('dotenv').config()
//for secure using dotenv: npm install dotenv
//all key saved in .env

router.post('/', function(req, res, next) {
  var oauth = new OAuth.OAuth(
     'https://api.twitter.com/oauth/request_token',
     'https://api.twitter.com/oauth/access_token',
     process.env.Consumer_Key,
     process.env.Application_Secret,
     '1.0A',
     null,
     'HMAC-SHA1'
   );
   var key = req.body.search
   oauth.get(
     'https://api.twitter.com/1.1/search/tweets.json?q='+key,
     process.env.User_Token, //test user token
     process.env.User_Secret, //test user secret
    //  function (e, data, res){ --> res change to cb (biar gak bentrok sama res di function pertama)
     function (e, data, cb){
       if (e) console.error(e);
       console.log(require('util').inspect(data));
      //  done();
      res.send(data)
     });
});

module.exports = router;

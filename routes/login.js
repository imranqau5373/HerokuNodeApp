

const request = require('request');
var express = require('express');
var router = express.Router();
var session = require('express-session');

let settings = {
  clientId : 'ynicj7x4xq',//'xcqzmrmdhs',
  clientSecret : 'xqj4zj0qf3aruwm7z9j2kellbyg40m',//'vhy0lod2ssttqpofycxshus0v7roes',
  oAuthUrl : 'https://oauth.wildapricot.org/auth/token',
  memberShipUrl : 'https://api.wildapricot.org/v2'


}
var responseData = {};

var loginData = {
  username : '',
  password : ''
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api-login', { title: 'User Login' });
});

router.get('/logout', function(req, res, next) {
  // res.cookie('auth','');
  res.redirect('/login');
});

router.post('/MemberData', function(req, res, next) {
  console.log('Member data.')
  var accessToken = req.body.accessToken;
  var accountId = req.body.accountId;
  
  request.get(`${settings.memberShipUrl}/accounts/${accountId}/membershiplevels`,{
     headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      "Authorization": `Bearer ${accessToken}`
    },
    json: true,
  },
  function( err, response, body) {
    if( err) {
      console.error(err);
      throw err;
    }
    else {
      res.status(200);
      res.json(body);
    }
  });
});
  

router.post('/', function(req, res, next) {
  loginData.username = req.body.username;
  loginData.password = req.body.password;

  request.post(settings.oAuthUrl, {
    form: {
      grant_type: 'password',
      username : loginData.username,
      password : loginData.password,
      scope: 'auto'
    },
    headers: {
       'content-type': 'application/x-www-form-urlencoded',
       'Accept': 'application/json',
       "Authorization": "Basic " + new Buffer(settings.clientId+":"+settings.clientSecret).toString('base64')
     },
    json: true
  }, function (err, response, body) {
    if( err) {
      console.log(err);
      res.status(400);
      res.json({error : "Bad Request"});
    }
    else {
      console.log(body);
      res.status(200);
      res.json(body);
    }
  })
});




module.exports = router;
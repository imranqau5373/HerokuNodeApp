const request = require('request');
var express = require('express');
var router = express.Router();
var session = require('express-session');

let settings = {
    clientId : 'ynicj7x4xq',//'xcqzmrmdhs',
    clientSecret : 'xqj4zj0qf3aruwm7z9j2kellbyg40m',//'vhy0lod2ssttqpofycxshus0v7roes',
    oAuthUrl : 'https://oauth.wildapricot.org/auth/token',
    accountId : '',
    eventViewUrl : 'https://api.wildapricot.org/v2' //https://api.wildapricot.org/v2.1/accounts/278451/events/3096695
  
  
  }

  router.post('/getEvent', function(req, res, next) {
    console.log('get Event Data',req.body.memberData);
    var accessToken = req.body.memberData.accessToken;
    var accountId = req.body.memberData.accountId;
    var eventId = req.body.memberData.eventId;
     request.get(`${settings.eventViewUrl}/accounts/${accountId}/events`,{
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

  router.post('/registerEvent', function(req, res, next) {
    var accessToken=req.body.accessToken;
    var accountId= req.body.accountId;
    
     request.post(`${settings.eventViewUrl}/accounts/${accountId}/eventregistrations`,{
      form: req.body,
        headers: {
         'content-type': 'application/x-www-form-urlencoded',
         'Accept': 'application/json',
         "Authorization": `Bearer ${accessToken}`
       },
       json: true,
     },
     function( err, response, body) {
         console.log('response is',body);
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


  module.exports = router;
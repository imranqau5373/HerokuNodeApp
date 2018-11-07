const request = require('request');
var express = require('express');
var router = express.Router();
var session = require('express-session');

let settings = {
    invoiceUrl : 'https://api.wildapricot.org/publicview/v1' //https://api.wildapricot.org/v2.1/accounts/278451/events/3096695

  }

  router.post('/getInvoices', function(req, res, next) {
    console.log('get invoice is',req.body);
    var accessToken = req.body.accessToken;
    var accountId = req.body.accountId;
     request.get(`${settings.invoiceUrl}/accounts/${accountId}/invoices`,{
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

  module.exports = router;
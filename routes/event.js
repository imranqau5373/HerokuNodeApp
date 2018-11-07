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
    
    var accessToken = req.body.accessToken;
    var accountId = req.body.accountId;
    var eventId = req.body.eventId;
     request.get(`${settings.eventViewUrl}/accounts/${accountId}/events/${eventId}`,{
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
    
    var accessToken = req.body.accessToken;
    var accountId = req.body.accountId;
    var eventId = req.body.eventId;
    var contactId= req.body.contactId;
    var requestTypeId= req.body.requestTypeId;
    var noOfGuest= req.body.numberOfGuest;
    var numberOfGuestsCheckedIn=req.body.NumberOfGuestsCheckedIn;
    var guestId= req.body.GuestId;
    var guestUrl=req.body.GuestUrl;
    var isCheckedIn=req.body.IsCheckedIn; //True or False
    var fieldName=req.body.FieldName;
    var systemCode=req.body.SystemCode;
    var value=req.body.Value;
    var showToPublic=req.body.ShowToPublic;
    var registrationDate=req.body.RegistrationDate;
    var memo=req.body.Memo;
    var recreateInvoice=req.body.RecreateInvoice;
 
     request.post(`${settings.eventViewUrl}/accounts/${accountId}/eventregistrations`,{
      form: {
        Id:0,
        Url:(`${settings.eventViewUrl}/Accounts/${accountId}`),
        Event: {
          Id:eventId
        },
        Contact: {
          Id: contactId
        },
        RegistrationTypeId: requestTypeId,
        GuestRegistrationsSummary: {
          NumberOfGuests:noOfGuest,
          NumberOfGuestsCheckedIn: numberOfGuestsCheckedIn,
          GuestRegistrations: [
            {
              Id: guestId,
              Url:GuestUrl
            }
          ]
        },
        IsCheckedIn: isCheckedIn,
        RegistrationFields: [
          {
            FieldName: fieldName,
            SystemCode: systemCode,
            Value: {}
          }
        ],
        ShowToPublic: showToPublic,
        RegistrationDate: registrationDate,
        Memo: memo,
        RecreateInvoice: recreateInvoice,
      },
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
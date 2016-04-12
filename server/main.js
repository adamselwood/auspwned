import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  CheckedAccounts = new Mongo.Collection('CheckedAccounts');

});

Meteor.methods({

  //Call haveibeenpwned account breach API
  //Return API response or false if not compromised
  //Updates database with account state (breached or not-breached)
    hibp: function (account) {
        this.unblock();

        try {
          result = Meteor.http.get("https://haveibeenpwned.com/api/v2/breachedaccount/" + account, {
             headers: {
               "User-Agent": "Testing" //Change this to something that reflects the calling agent (e.g. AusPwned)
             },
             params: {
               truncateResponse: false //Switch this to false if you want to return the full response
             }
          });

          //Iterate the result and create a document for each breach associated with an account
          _.each(result.data, function(item) {
            CheckedAccounts.insert({account: account, breach: item.Name, data_classes: item.DataClasses, sensitive: item.IsSensitive});
          });


          console.log(account + " compromised"); //Log result to server console
          return result; //Return the result of the query to the client

        } catch (error) {
          //Assume error indicates no breach and create document with breach as none fo that account
          CheckedAccounts.insert({account: account, breach: 'none', sensitive: false});
          console.log(account + " not-compromised"); //Log result to server console
          return false; //Nothing to see here
        }
    },

    //Raw MongoDB call for distinct accounts
    //Return count of result
    checked: function () {
      var raw = CheckedAccounts.rawCollection(); //Raw mongodb call for distinct support
      var distinct = Meteor.wrapAsync(raw.distinct, raw);
      return distinct('account').length; //count number of distinct accounts
    },

    //Raw MongoDB call for distinct breached accounts
    //Return count of result
    breached: function () {
      var raw = CheckedAccounts.rawCollection(); //Raw mongodb call for distinct support
      var distinct = Meteor.wrapAsync(raw.distinct, raw);
      return distinct('account', {breach: {$ne:"none"}}).length; //count number of distinct accounts
    }
});

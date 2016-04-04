import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

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
               truncateResponse: true //Switch this to false if you want to return the full response
             }
          });

          console.log(account + " compromised"); //Do something on the server with the breached accounts
          return result; //Return the result of the query to the client

        } catch (error) {
          console.log(account + " not-compromised"); //Do something on the server with the unbreached accounts
          return false; //Nothing to see here
        }
    }
});

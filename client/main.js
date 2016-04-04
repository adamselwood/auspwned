import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hibp.events({
  'click button': function(event, template) {
    event.preventDefault();
    var account = template.find('input#account').value;

    Meteor.call("hibp", account, function(error, results) {
        if (results.content) {
          Session.set("account", account); //Set the account session variable as the last input
          console.log(results.content); //results.data should be a JSON object
        } else {
          Session.set("account", false);
        }
    });
  }
});

Template.accountstate.helpers({
  'isCompromised': function() {
    return Session.get("account"); //Returns current state of account Session to trigger display of compromised div
  }
});
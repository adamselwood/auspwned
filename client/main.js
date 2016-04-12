import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

CheckedAccounts = new Mongo.Collection('CheckedAccounts');

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

Template.register.events({

  'change': function(event, template) {
    event.preventDefault();
    var account = template.find('input#email').value;

    Meteor.call("hibp", account, function(error, results) {
        if (results.content) {
          Session.set("account", account); //Set the account session variable as the last input
          console.log(results.content); //results.data should be a JSON object
        } else {
          Session.set("account", false);
        }
    });
  },
});

Template.accountstate.helpers({
  'isCompromised': function() {
    return Session.get("account"); //Returns current state of account Session to trigger display of compromised div
  }
});

Template.pwned_email.helpers({
  'isCompromised': function() {
    return Session.get("account"); //Returns current state of account Session to trigger display of compromised div
  }
});

Template.pwned.helpers({
  'numChecked': function(){
    Meteor.call("checked", function(error, results) {
        if (results) {
          Session.set("checked", results);
        } else {
          console.log(error);
        }
    });
    return Session.get("checked");
  },

  'numBreached': function(){
    Meteor.call("breached", function(error, results) {
        if (results) {
          Session.set("breached", results);
        } else {
          console.log(error);
        }
    });
    return Session.get("breached");
  },
});

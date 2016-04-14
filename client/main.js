import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

CheckedAccounts = new Mongo.Collection('CheckedAccounts');

Template.hibp.events({
  'click button': function(event, template) {
    event.preventDefault();
    var account = template.find('input#account').value;
    var none = "none"

    Meteor.call("hibp", account, function(error, results) {
        if (results.content) {
          Session.set("account", account); //Set the account session variable as the last input
          console.log(results.content); //results.data should be a JSON object
        } else {
          Session.set("account", none);
        }
    });
  }
});

Template.register.events({

  'change': function(event, template) {
    event.preventDefault();
    var account = template.find('input#email').value;
    var none = "none"

    Meteor.call("hibp", account, function(error, results) {
        if (results.content) {
          Session.set("account", account); //Set the account session variable as the last input
          console.log(results.content); //results.data should be a JSON object
        } else {
          Session.set("account", none);
        }
    });
  },
});

Template.register.helpers({
  'account': function() {
    return Session.get("account");
  }
});

Template.accountstate.helpers({
  'isCompromised': function() {
    var none = "none";
    if (Session.get("account") == none) {
      return false;
    } else {
      return Session.get("account"); //Returns current state of account Session to trigger display of compromised div
    }
  },

  'notCompromised': function() {
    var none = "none";
    if (Session.get("account") == none) {
      return true;
    } else {
      return false;
    }
  }
});

Template.pwned_email.helpers({
  'isCompromised': function() {
    return Session.get("account"); //Returns current state of account Session to trigger display of compromised div
  }
});

Template.consumer.helpers({
  'account': function() {
    return Session.get("account");
  }
});

Template.business.helpers({
  'account': function() {
    return Session.get("account");
  }
});

Template.business.events({
  'click button': function(event, template) {
    event.preventDefault();
    Session.set("account", false);
    console.log("Reset");
    FlowRouter.go("/");
  }
});

Template.scoreboard.helpers({
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

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

CheckedAccounts = new Mongo.Collection('CheckedAccounts');

Template.hibp.events({
  'click button': function(event, template) {
    event.preventDefault();

    Materialize.toast('Checking breaches', 2000);

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

    Meteor.call("hibp", account, function(error, results) {
        if (results.content) {
          Session.set("account", account); //Set the account session variable as the last input
          Session.set("consumer", account); 
          console.log(results.content); //results.data should be a JSON object
        } else {
          Session.set("account", false);
        }
    });
  },

  'click button': function(event, template) {
    var consumer = template.find('input#email').value;
    Session.set("consumer", consumer);
    FlowRouter.go("/consumer");
  }
});

Template.pwned.events({
  'click button': function(event, template) {
    event.preventDefault();
    Session.set("account", false);
    console.log("Reset");
    FlowRouter.go("/register");
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

Template.pwned.helpers({
  'breaches': function() {
    var account = Session.get("account");
    var breaches = null;
    Meteor.call("breaches", account, function(error, results) {
          console.log(results);
          breaches = results;
    });
    return breaches;
  }
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
  'consumer': function() {
    return Session.get("consumer");
  }
});

Template.business.helpers({
  'account': function() {
    return Session.get("consumer");
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

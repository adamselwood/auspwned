FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("main");
  }
});

FlowRouter.route('/pwned', {
  action: function() {
    BlazeLayout.render("pwned");
  }
});

FlowRouter.route('/register', {
  action: function() {
    BlazeLayout.render("register");
  }
});

FlowRouter.route('/business', {
  action: function() {
    BlazeLayout.render("business");
  }
});

FlowRouter.route('/consumer', {
  action: function() {
    BlazeLayout.render("consumer");
  }
});

FlowRouter.route('/scoreboard', {
  action: function() {
    BlazeLayout.render("scoreboard");
  }
});

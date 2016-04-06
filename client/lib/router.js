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

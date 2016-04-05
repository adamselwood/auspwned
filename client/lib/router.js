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

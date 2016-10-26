Template.register.events({
  'submit form': function(){
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Accounts.createUser({
      email: email,
      password: password
    });
    Meteor.loginWithPassword(email, password);
    FlowRouter.go('/profile');
  },

  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go('/');
  }
});

Template.register.helpers({
  'currentUser': function(){
    return Meteor.userId();
  }
})

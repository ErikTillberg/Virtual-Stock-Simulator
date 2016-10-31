Template.loginRegisterButton.events({
  'click .login-confirm': function(){
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();

    Meteor.loginWithPassword(email, password, function(){
      if (Meteor.userId()){
        FlowRouter.go('/profile');
      }
    });
  },

  'click .register-confirm': function(){

    event.preventDefault();
    var email = $('[name=email1]').val();
    var password = $('[name=password1]').val();

    Accounts.createUser({
      email: email,
      password: password
    });

    Meteor.loginWithPassword(email, password, function(){
      if (Meteor.userId()){
        FlowRouter.go('/profile');
      }
    });
  }
});

Template.loginRegisterButton.helpers({
  'currentUser': function(){
    return Meteor.userId();
  }
})

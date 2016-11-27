import { Accounts } from 'meteor/accounts-base';

Template.loginRegisterButton.events({
  'click .login-confirm': function(){
    event.preventDefault();
    var user =  $('[name=user]').val();
    var password = $('[name=password]').val();

    Meteor.loginWithPassword(user, password, function(){
      if (Meteor.userId()){
        FlowRouter.go('/profile');
      }
    });
  },

  'click .register-confirm': function(){

    event.preventDefault();
    var userName =  $('[name=user1]').val();
    var userEmail = $('[name=email1]').val();
    var userPassword = $('[name=password1]').val();
    //var passconf = $('[name=password2]').val();

      // confirm password
    if(userPassword){
        Accounts.createUser({
            username: userName,
            email: userEmail ,
            password: userPassword
        });


        Meteor.loginWithPassword(userName, userPassword, function(){
            if (Meteor.userId()){
                //on registration, put this much money in the persons wallet:
                Meteor.users.update({_id: Meteor.userId()},
                    {
                        $set:
                        {
                            'cashOnHand': 10000, //start with $10000 USD7
                            'stocksOwned': {}
                        }
                    });

                FlowRouter.go('/profile');
            }
        });
    }
    else{

    }
  }
});

Template.loginRegisterButton.helpers({
  'currentUser': function(){
    return Meteor.userId();
  }
})

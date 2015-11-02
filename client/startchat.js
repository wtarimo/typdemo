Meteor.subscribe("users");

Template.startchat.helpers({
	userCount: function(){
		return Meteor.users.find({}).count();
	},
	users: function(){
		return Meteor.users.find({});
	}
});

Template.startchat.events({
	"click #startChatButton": function () {
      var selectedUsers = [];
	  $.each($("input[name='selectedUsers']:checked"), function(){            
        selectedUsers.push($(this).val());
      });
      var profile = Meteor.user().profile;
      var newchat = {
		creatorId:Meteor.userId(),  
		creatorName:profile["firstName"]+" "+profile["lastName"], 
		otherParticipants:selectedUsers,
		createdOn: new Date()
	  };
	  var chatId = Chats.insert(newchat);
	  Router.go('/chats/'+chatId);
    }
});

Template.user2.helpers({
	notCurrentUser: function(id){
		return Meteor.userId() != id;
	}
});
Template.chatPage.events({
  "submit #messageform": function(event){
    
    event.preventDefault();
    
    var body = $("#message-body").val();
    
    $("#message-body").val("");

    var profile = Meteor.user().profile;
    
    var message = {
        uid:Meteor.userId(),  
        who:profile["firstName"]+" "+profile["lastName"], 
        body:body,
        cid:this._id,
        when: new Date()
      };    
    Messages.insert(message);
  }
});

Template.chatPage.helpers({
  messages: function(){
    return Messages.find({cid:this._id},{sort:{when:-1}});
  },
  nummessages: function(){
    return Messages.find({cid:this._id},{}).count();
  }
});

Template.currentChat.helpers({
  participantNames: function(){
    var participantIds = this.otherParticipants;
    participantIds.push(this.creatorId);
    var index = participantIds.indexOf(Meteor.userId());
    participantIds.splice(index,1);
    var names = [];
    var users = Meteor.users.find({});
    participantIds.forEach(function(id){
      var user = Meteor.users.findOne({ _id: id });      
            names.push(user.profile.firstName);
        });
        return names.join(", ");
  },
  messageCount: function(){
    return Messages.find({cid:this._id},{}).count();
  },
    authorized: function(){
      return this.creatorId==Meteor.userId();
    }
});

Template.message.helpers({
  authorized: function(){
    return this.uid==Meteor.userId();
  }
});

Template.currentChat.events({
    "click #delete": function () {
    	if (Meteor.userId() != this.creatorId)
    		alert("Not Authorized!");
    	else {
      	Meteor.call("deleteChat", this._id);
        Router.go("/chats");
      }
    }
});

Template.message.events({
    "click #delete": function () {
      Messages.remove(this._id);
    }
});
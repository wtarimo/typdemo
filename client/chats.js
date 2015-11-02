function getChats(){
	var chats = [];
	var allchats = Chats.find({},{sort:{createdOn:-1}});
	allchats.forEach(function(chat){
		if (chat.creatorId===Meteor.userId() || chat.otherParticipants.indexOf(Meteor.userId()) > -1) {
			chats.push(chat);
		}
    });
	return chats;
}

Template.chats.helpers({
	chats: function(){
		return getChats();
	},
	numchats: function(){
		return getChats().length;
	}
});

Template.chat.helpers({
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

Template.chat.events({
    "click #delete": function () {
    	Meteor.call("deleteChat", this._id);
    }
});
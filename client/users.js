Meteor.subscribe("users");

Template.users.helpers({
	userCount: function(){
		return Meteor.users.find({}).count();
	},
	users: function(){
		return Meteor.users.find({});
	}
});
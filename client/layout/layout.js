Template.layout.helpers({
	numchats: function(){
		return ChatLines.find().count();
	},
	numposts: function(){
		return Posts.find().count();
	}
});
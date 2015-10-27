Template.posts.events({
	"submit #postform": function(event){
		
		event.preventDefault();
		
		var heading = $("#heading").val();
		var category = $("#category").val();
		var body = $("#body").val();
		
		$("#heading").val("");
		$("#category").val("");
		$("#body").val("");

		var profile = Meteor.user().profile;
		
		var post = {
			uid:Meteor.userId(),  
			name:profile["firstName"]+" "+profile["lastName"],
			username:profile["username"],
			body:body,
			heading:heading,
			category:category,
			likes:[],
			dislikes:[],
			comments:0,
			when: new Date()
		};		
		Posts.insert(post);
	}
});

Template.posts.helpers({
	posts: function(){
		return Posts.find({},{sort:{when:-1}});
	},
	numposts: function(){
		return Posts.find().count();
	},
});

Template.post.helpers({
	likes: function(){
		return this.likes.length;
	},
	dislikes: function(){
		return this.dislikes.length;
	},
});

Template.post.events({
	"click #like": function () {
      var likes = this.likes;
      var index = likes.indexOf(Meteor.userId());
      if (index < 0) {
      	likes.push(Meteor.userId());
      }
      var dislikes = this.dislikes;
      index = dislikes.indexOf(Meteor.userId());
      if (index > -1) {
      	dislikes.splice(index, 1);
      }
      Posts.update(this._id, {
  		$set: {likes:likes,dislikes:dislikes}
  	  });
    },

	"click #dislike": function () {
      var dislikes = this.dislikes;
      var index = dislikes.indexOf(Meteor.userId());
      if (index < 0) {
      	dislikes.push(Meteor.userId());
      }
      var likes = this.likes;
      index = likes.indexOf(Meteor.userId());
      if (index > -1) {
      	likes.splice(index, 1);
      }
      Posts.update(this._id, {
  		$set: {likes:likes,dislikes:dislikes}
  	  });
    },
    "click #delete": function () {
    	if (Meteor.userId() != this.uid)
    		alert("Not Authorized!");
    	else
      		Posts.remove(this._id);
    }
});
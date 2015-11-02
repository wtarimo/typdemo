Template.postPage.events({
  "submit #commentform": function(event){
    
    event.preventDefault();
    
    var body = $("#comment-body").val();
    
    $("#comment-body").val("");

    var profile = Meteor.user().profile;
    
    var comment = 
        {
        uid:Meteor.userId(),  
        who:profile["firstName"]+" "+profile["lastName"], 
        body:body,
        pid:this._id,
        when: new Date()
      };    
    Comments.insert(comment);
  }
});

Template.postPage.helpers({
  comments: function(){
    return Comments.find({pid:this._id},{sort:{when:-1}});
  },
  numcomments: function(){
    return Comments.find({pid:this._id},{}).count();
  }
});

Template.currentPost.helpers({
	likes: function(){
		return this.likes.length;
	},
	dislikes: function(){
		return this.dislikes.length;
	},
  numcomments: function(){
    return Comments.find({pid:this._id},{}).count();
  }
});

Template.comment.helpers({
  authorized: function(){
    return this.uid==Meteor.userId();
  }
});

Template.currentPost.events({
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
    	else {
        Meteor.call("deletePost", this._id);
        Router.go("/posts");
      }
    }
});
Template.comment.events({
    "click #delete": function () {
      Comments.remove(this._id);
    }
});
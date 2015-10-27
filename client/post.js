Template.currentPost.helpers({
	likes: function(){
		return this.likes.length;
	},
	dislikes: function(){
		return this.dislikes.length;
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
    	else
      		Posts.remove(this._id);
    }
});
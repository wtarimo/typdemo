Meteor.methods({
  deletePost: function (postId) {
    Comments.remove({pid:postId});
    Posts.remove(postId);
  }
});

Meteor.publish("users", function () {
	return Meteor.users.find({}, {fields: {emails: 1, profile: 1, _id:1}});
});
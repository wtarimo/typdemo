Meteor.methods({
  deletePost: function (postId) {
    Comments.remove({pid:postId});
    Posts.remove(postId);
  },
  deleteChat: function (chatId) {
    Messages.remove({cid:chatId});
    Chats.remove(chatId);
  }
});

Meteor.publish("users", function () {
	return Meteor.users.find({}, {fields: {emails: 1, profile: 1, _id:1}});
});
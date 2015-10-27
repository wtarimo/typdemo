if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish("users", function () {
    return Meteor.users.find();
  });
}

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("users");
  //console.log(Meteor.user());
}
console.log(Meteor.users.find().count());
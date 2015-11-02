Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'welcome'});

Router.route('/about');
Router.route('/chats');
Router.route('/users');
Router.route('/startchat');
Router.route('/posts');
Router.route('/posts/:_id', {
    template: 'postPage',
    data: function(){
        var postId = this.params._id;
        return Posts.findOne({ _id: postId });
    }
});
Router.route('/chats/:_id', {
    template: 'chatPage',
    data: function(){
        var chatId = this.params._id;
        return Chats.findOne({ _id: chatId });
    }
});

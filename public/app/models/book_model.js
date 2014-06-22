define([],function(){
	var BookModel = Backbone.Model.extend({
            defaults : {
                title: '',
                author: '',
                mobile: '',
                website: 'Website',
                tempId:'',
                username:'',
                company:'',
                title:'',
                photoUrl:'',
                url:'',
                userSession: false
            }
    });
    return BookModel;
})
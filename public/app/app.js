define([
	'views/book_listing',
	'views/book_filter'
], function(BookListView, BookFilterView){
	shareBook = {
		init: function(){
			var AppRouter = Backbone.Router.extend({
				routes: {
					'*default':'deafultRoute'
				}
			});
			var _this = this;
			this.dispatcher = _.extend({}, Backbone.Events);
			this.shareBookRoute = new AppRouter();
			this.shareBookRoute.on('route:deafultRoute',function(){
				_this.bookListView = new BookListView();
				_this.bookFilterView = new BookFilterView();
				_this.bookFilterView.render();
				_this.bookListView.render();
			})
			Backbone.history.start();
			console.log('up and running')
		}
	};

	$(function(){
		shareBook.init();
	})
})
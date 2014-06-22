define([
	'models/book_model',
	'hbs!templates/book_filter_template'
], function(BookModel, BookFilterTemplate){
	var BookFilterView = Backbone.View.extend({

		el:'#content',

		container:'.filter-column',

		initialize : function(){
			this.dispatcher = shareBook.dispatcher
		},
		
		render:function(){
			$(this.container, this.el).html(BookFilterTemplate);
			var _this = this;
		},

		events:{
			'click .checkbox label':'filter_books',
			'click span.clear':'clear_filter'
		},
		
		filter_books:function(evt){
			evt.preventDefault();
			console.log('yummmmmm')
			evt.stopImmediatePropagation();
		},

		clear_filter:function(){
			console.log('yummmmmm')
		}
	})
	return BookFilterView;
})
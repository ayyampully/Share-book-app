define([
	'models/book_model',
	'hbs!templates/book_list_template'
], function(BookModel, BookListTemplate){
	var BookListView = Backbone.View.extend({

		el:'#content',

		container:'.item-wrap',

		initialize : function(){
			this.dispatcher = shareBook.dispatcher
		},
		
		render:function(){
			
			var _this = this;
			$.ajax({
				url:'/getlist',
				type:'post',
				dataType:'JSON',
				success:function(data){
					var params = $.extend({
						listItem: data
					});

					$(_this.container, _this.el).html(BookListTemplate(params));
					$('.item-single',_this.container).addClass('all');
					
				},
				error:function(err){
					console.log(err)
				}
			});
		},

		events:{
			'click .request':'request_book',
			'click .wishlist':'request_book'
		},
		
		request_book:function(){
			console.log('yummmmmm')
		}
	})
	return BookListView;
})
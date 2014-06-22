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
			var _this = this;
			$.ajax({
				url:'/getcategories',
				type:'post',
				dataType:'JSON',
				success:function(data){
					
					var groupCat = _.groupBy(data), 
						categories = [];
					
					$.each(groupCat, function(key,value, i){

						categories.push({
							'label' : key,
							'count' : value.length
						})

					});

					var params = $.extend({
						categories: categories
					});

					$(_this.container, _this.el).html(BookFilterTemplate(params));
				},
				error:function(err){
					console.log(err)
				}
			})
		},

		events:{
			'click .checkbox':'filter_books',
			'click span.clear':'clear_filter'
		},
		
		filter_books:function(evt){
			
			//$('.item-single', this.el).removeClass('all');
			var _this = this;
			if($('.checkbox input:checked', this.el).length ===0){
				this.clear_filter();
			}
			$('.checkbox',this.el).each(function(){
				var target = $(this),
				className = target.attr('data-value'),
				checkbox = target.find('input');
				if(checkbox.is(':checked')){
					checkbox.prop('checked',true)
					$('.item-single', _this.el).not('.'+className).fadeOut();
				}
			})
			
			evt.stopImmediatePropagation();
		},

		clear_filter:function(){
			$('.checkbox input', this.el).prop('checked',false);
			$('.item-single', this.el).fadeIn();
		}
	})
	return BookFilterView;
})
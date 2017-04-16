//<![CDATA[
	var enable_ajax_cart = 1;
	var enable_ajax_compare = 1;
	var enable_ajax_wishlist = 1;
	var smcartpro_effect = 'click';
	var cartpro_baseurl = 'http://magento2.flytheme.net/themes/sm_sport/default/';
	var isLoggedIn = 0;
	var is_page_wishlist = 0;
	var currencyCode = '$';
	var confirm_countdown_number = 5;
	
	function loadaJax(){
		if(enable_ajax_compare && enable_ajax_compare == 1)
			_eventCompare();
	
		if(enable_ajax_wishlist && enable_ajax_wishlist == 1)				
			_eventWishlist();
	
		if(enable_ajax_cart && enable_ajax_cart == 1)
			_eventCart();
		if(smcartpro_effect && smcartpro_effect == 'hover')
			_hoverCart();
	}
	
	function _resetModal(){	
		var $ = (typeof $ !== 'undefined') ? $ : jQuery.noConflict();
		$('.cpmodal-iframe').empty();
		$('.cpmodal-message').empty();
		$('.cpmodal-viewcart').addClass('cartpro-hidden');
		$('.cartpro-wishlist').addClass('cartpro-hidden');	
		$('.cartpro-compare').addClass('cartpro-hidden');
		$('.cartpro-time').addClass('cartpro-hidden');	
	}
	
	function _hoverCart(){
		var $ = (typeof $ !== 'undefined') ? $ : jQuery.noConflict();
		$( ".minicart-wrapper" ).click(function() {
		  return false;
		});			
		$( ".minicart-wrapper" )
		  .mouseover(function() {
			$(this).addClass('active');
			$('.showcart',this).addClass('active');
			$('.ui-widget-content',this).show();
		  })
		  .mouseout(function() {
			$(this).removeClass('active');
			$('.showcart',this).removeClass('active');
			$('.ui-widget-content',this).hide();
		});
	}
	
	function _eventCart(){
		var $ = (typeof $ !== 'undefined') ? $ : jQuery.noConflict();
		$(".action.tocart").removeAttr("data-mage-init");
		$(".action.tocart").unbind('click').click(function(e) {
		   if(typeof $("#cartpro_modal form[id^=product_addtocart_form_]") !== 'undefined' && $("#cartpro_modal form[id^=product_addtocart_form_]").length){
				$('#cartpro_modal form[id^=product_addtocart_form_]').mage('validation', {
					radioCheckboxClosest: '.nested',
					submitHandler: function (form) {
						var widget = $(form).catalogAddToCart({
							bindSubmit: false
						});
						widget.catalogAddToCart('submitForm', $(form));
						return false;
					}
				});				   
		   }else if ($(this).parents('#product_addtocart_form').length){
			   
		   }else{
				e.preventDefault();
				_addCart($(this));
				return false;				   
		   }
		});				
	}
	
	function _eventCompare(){
		var $ = (typeof $ !== 'undefined') ? $ : jQuery.noConflict();
		$(".action.tocompare").unbind('click').click(function(e) {				   
			e.preventDefault();				
			_addCompare($(this));
			return false;
		});		

		$("#product-comparison .action.delete").unbind('click').click(function(e) {	
			e.preventDefault();
			_removeCompare($(this));
			return false;
		});				
	}		
	
	
	function _removeCompare(_e){
			var $ = (typeof $ !== 'undefined') ? $ : jQuery.noConflict();
			$("#cartpro_process").addClass('cartpro-show');
			var post = $(_e).data('post');
			$.ajax({
				url: 'http://magento2.flytheme.net/themes/sm_sport/default/cartpro/compare/remove',
				data : post.data,
				type:'POST',
				dataType:'json',
				success:function(json){
					if (typeof json.items_markup !== 'undefined'){
						if(json.items_markup.success == 1){
							var message = json.items_markup.message;
							var block_compare = json.items_markup.block_compare;
							$('.cpmodal-message').replaceWith(message);
							$('#product-comparison').replaceWith(block_compare);
							loadaJax();							
						}
					}
					$("#cartpro_process").removeClass('cartpro-show');
				}
			});			
	}
	
	function _addCompare(_e){
			var $ = (typeof $ !== 'undefined') ? $ : jQuery.noConflict();
			_resetModal();
			$("#cartpro_process").addClass('cartpro-show');	
			$('html').addClass('cartpro-block');	
			var post = $(_e).data('post');
			var params = {};
			params = post.data;
			params.form_key = $('input[name=form_key]').val();
			$.ajax({
				url: 'http://magento2.flytheme.net/themes/sm_sport/default/cartpro/compare/add',
				data : params,
				type:'POST',
				dataType:'json',
				success:function(json){
					if (typeof json.items_markup !== 'undefined'){
						if(json.items_markup.success == 1){
							var message = json.items_markup.message;
							var nb_items = json.items_markup.nb_items;
							var catalog_compare_sidebar = json.items_markup.catalog_compare_sidebar;
							$('.cpmodal-message').html(message);
							$('.compare .counter.qty').html(nb_items+' Items');
							$('.sidebar.sidebar-additional block.block-compare').replaceWith(catalog_compare_sidebar);
						}
					}
					$("#cartpro_process").removeClass('cartpro-show');
					$("#cartpro_modal").addClass('cartpro-show');
					
					$('.cartpro-compare').removeClass('cartpro-hidden');
					$('.cartpro-time').removeClass('cartpro-hidden');
					start_time(confirm_countdown_number);
				}
			});	
		return true;		
	}
	
	function _addCart(_e){
		var $ = (typeof $ !== 'undefined') ? $ : jQuery.noConflict();
		_resetModal();				
		$("#cartpro_process").addClass('cartpro-show');
		$('html').addClass('cartpro-block');	
		var action = '';
		if($(_e).data('post')){
			 action = $(_e).data('post').action;	
		}else{
			 action = $(_e).closest('form').attr('action');
		}
		
		var params = {};
		if($('body').hasClass('catalog-product-compare-index')){
			params.product = $(_e).closest('.product.info').find('.price-final_price').data('product-id'); 
		}else{
			if($(_e).data('post'))
				params = $(_e).data('post').data;	
			else if($(_e).closest('form').length)
				params = $(_e).closest('form').serializeArray();
			else 
				params.product = $(_e).closest('.product-item-info').find('.price-box').data('product-id'); 
		}
		params.form_key = $('input[name=form_key]').val();
		if(!params.product)
			params.product = $(_e).closest('.product-item-info').find('.price-box').data('product-id'); 
		$.ajax({
			url: 'http://magento2.flytheme.net/themes/sm_sport/default/cartpro/cart/add',
			data : params,
			type: 'post',
			dataType: 'json',
			success:function(json){
				if(typeof json.items_markup.success !== 'undefined' && json.items_markup.success){
					$.ajax({
						url: 'http://magento2.flytheme.net/themes/sm_sport/default/cartpro/product/view',
						data : params,
						type: 'post',
						dataType: 'json',
						success:function(json){
							if(json.items_markup){										
								$('.cpmodal-iframe').html(json.items_markup);
								$('.cpmodal-message').html(json.name_product);
								$("#cartpro_process").removeClass('cartpro-show');
								$("#cartpro_modal").addClass('cartpro-show');
								$('html').addClass('cartpro-block');
								loadaJax();
							}	
						}
					});									
				}else{
					$.ajax({
						url: action,
						data : params,
						type: 'post',
						dataType: 'json',
						success:function(json){
							$("#cartpro_process").removeClass('cartpro-show');	
							$("html").removeClass('cartpro-block');
						}
					});					
				}
			}
		});	
		return false;					
	}
	
	
	function _eventWishlist(){	
		var $ = (typeof $ !== 'undefined') ? $ : jQuery.noConflict();	
			$(".action.towishlist").unbind('click').click(function(e) {	
				e.preventDefault();							
				if(isLoggedIn){	
					_addWishlist($(this));
					return false;
				}else{
					var check =  confirm('You must login first !');
					if(check == true){
						return true;
					} else {
						return false;
					}
				}	
			});	

		$("#wishlist-view-form .btn-remove.delete").click(function(e) {
			$("#cartpro_process").addClass('cartpro-show');	
			e.preventDefault();
			var post = $(this).data('post-remove');
			$.ajax({
				url: 'http://magento2.flytheme.net/themes/sm_sport/default/cartpro/wishlist/remove',
				data : post.data,
				dataType:'json',
				success:function(json){
					if (typeof json.items_markup !== 'undefined'){
						if(json.items_markup.success == 1){
							var message = json.items_markup.message;
							var block_wishlist = json.items_markup.block_wishlist;
							$('#wishlist-view-form').replaceWith(block_wishlist);
							$('.cpmodal-message').replaceWith(message);
							loadaJax();							
						}
					}
					$("#cartpro_process").removeClass('cartpro-show');
				}
			});
			return false;
		});	
		
	}
	
	function _addWishlist(_e){
		var $ = (typeof $ !== 'undefined') ? $ : jQuery.noConflict();
		_resetModal();
		$("#cartpro_process").addClass('cartpro-show');		
		var post = $(_e).data('post');
		$.ajax({
			url: 'http://magento2.flytheme.net/themes/sm_sport/default/cartpro/wishlist/add',
			data : post.data,
			dataType:'json',
			success:function(json){
				if (typeof json.items_markup !== 'undefined'){
					if(json.items_markup.success == 1){
						var message = json.items_markup.message;
						var nb_items = json.items_markup.nb_items;
						$('.cpmodal-message').html(message);
					}
				}
				$("#cartpro_process").removeClass('cartpro-show');
				$("#cartpro_modal").addClass('cartpro-show');
				$('.cartpro-wishlist').removeClass('cartpro-hidden');
				$('.cartpro-time').removeClass('cartpro-hidden');
				start_time(confirm_countdown_number);
			}
		});	
		return false;			
	}		
	
	function start_time(timer){
		var $ = (typeof $ !== 'undefined') ? $ : jQuery.noConflict();
		if (timer == 0){
	      	clearTimeout(timeout);
			$("#cartpro_modal").removeClass('cartpro-show');
			$("html").removeClass('cartpro-block');
			 _resetModal();
			return false;
	    }
		timeout = setTimeout(function(){
			timer--;
			$(".cpmodal-time").html(timer+' s');
			start_time(timer);
	  	}, 1000);
	}	
//]]>    
jQuery(document).ready(function($) {
	$('.category-item-more-button').click(function(event) {
		$('.ajax-loading').show();
		event.preventDefault();
		var offset = $('.archive-wrapper .post-item').length;
		var scrollHeight = $('.archive-wrapper .post-item').outerHeight();
		var currentHeight = $(this).offset().top;
		var cat = $('input[name="category"]').val();
		var post_type = $('input[name="post_type"]').val();
		$.ajax({
			type: "POST",
			url: ajax.url,
			data: {
				action: 'load_more_post',
				offset: offset,
				cat: cat,
				post_type: post_type
			},
		})
		.done(function(resp) {
			var data = JSON.parse(resp);
			if (data.message == 'available') {
				$(data.data).insertBefore( ".post-item-more" );
				$('body').animate({scrollTop: currentHeight + scrollHeight}, 500, 'swing');
			} else {
				$('.empty-arlert').show();
			}
		})
		.always(function(resp) {
			$('.ajax-loading').hide();
		})
	})

	$(document).on('click', '.popup-overlay', function() {
		$('.popup-overlay').removeClass('flex-box');
		$('.product-item-popup').fadeOut();
	})

	$(document).on('click', '.product-item-link', function(event) {
		$('.popup-overlay').addClass('flex-box');
		event.preventDefault();
		var id = $(this).attr('data-post-id');
		$.ajax({
			type: "POST",
			url: ajax.url,
			data: {
				action: 'popup_product',
				id: id
			}
		})
		.done(function(resp) {
			var data = JSON.parse(resp);
			$('.product-item-popup').fadeIn();
			$('.product-item-popup').html('');
			$('.product-item-popup').append(data.data);
			$('.bxslider').bxSlider({
				pagerCustom: '#bx-pager'
			});
		})
		.always(function(resp) {

		})
	})
	
	$('body').on('click', '.form-add-more-button', function(event) {
		event.preventDefault();
		
		$('.add-on-people-table').fadeIn();
		var i = parseInt($('.add-on-people-table h6').length + 1);
		var html = '';
		html += "<h6>#" + i + "</h6>";
		html += "<tr>"
			html += "<td width='33%'>Họ và tên <span class='requiredment'>*</span></td>";
			html += "<td><input type='text' name='name' id='inputID' class='form-control' value='' title='' required='required'></td>";
		html += "</tr>";
		html += "<tr>"
			html += "<td width='33%'>Ngày sinh <span class='requiredment'>*</span></td>";
			html += "<td>";
				html += "<div class='input-group date'>";
					html += "<input type='text' class='form-control date-picker' value='' name='birth'>";
					html += "<div class='input-group-addon'>";
						html += "<i class='fa fa-calendar' aria-hidden='true'></i>";
					html += "</div>";
				html += "</div>";
			html += "</td>";
		html += "</tr>";
		html += "<tr>"
			html += "<td width='33%'>Điện thoại <span class='requiredment'>*</span></td>";
			html += "<td><input type='text' name='tel' id='inputID' class='form-control' value='' title='' required='required'>";
			html += "</td>";
		html += "</tr>";
		html += "<tr>"
			html += "<td width='33%'>Email <span class='requiredment'>*</span></td>";
			html += "<td><input type='email' name='email' id='inputID' class='form-control' value='' title='' required='required'>";
			html += "</td>";
		html += "</td>";
		html += "</tr>";
			html += "<td width='33%'>Facebook</td>";
			html += "<td><input type='text' name='facebook' id='inputID' class='form-control' value='' title=''>";
			html += "</td>";
		html += "<tr>";

		$('.add-on-people-body').append(html);
	})
})
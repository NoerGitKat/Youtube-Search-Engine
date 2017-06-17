$(document).ready(() => {

	$(function() {
		// Search Bar Handler
		var searchField = $('#query');
		var icon = $('#searchbtn');

		$(searchField).on('focus', function () {
			$(this).animate({
				width: '100%'
			}, 500);
			$(icon).animate({
				right: '10px'
			}, 500);
		});

		// Blur Event Handler
		$(searchField).on('blur', function() {
			if(searchField.val() == '') {
				$(this).animate({
					width: '40%'
				}, 500, function() {});
				$(icon).animate({
					right: '190px'
				}, 500, function() {});
			}
		});
	});
});
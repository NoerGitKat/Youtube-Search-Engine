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

		$('#searchform').submit(function(e) {
			e.preventDefault();
		});
	});
});

function search() {
		// Clear Results
		$('#results').html('');
		$('#buttons').html('');

		//Get Form Input
		q = $('#query').val();

		//Run GET Request on API
		$.get(
			'https://www.googleapis.com/youtube/v3/search', {
			part: 'snippet, id',
			q: q,
			type: 'video',
			key: 'AIzaSyDNWZzft1jXR2MVPHoEvUn2wVGzlfHkRTE'
		},
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				console.log(data);

				// $.each(data.items) {}
			});
}
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

			// Log Data to Make Sure It Works
			console.log(data);

			$.each(data.items, function(i, item) {
				// Get Output of Each Loop
				var output = getOutput(item);


				//Display Search Results
				$('#results').append(output);
			});
		});
}

// Create getOutput Function 
function getOutput(item) {
	// Declare Variables First
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumbnails = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	var output = '<li>' +
	'<div class="list-left">' + 
	'<img src="' + thumbnails + '"/>' +
	'</div>' + 
	'<div class="list-right">' +
	'<h3>' + title + '</h3>' +
	'<small>By <span class="channelTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
	'<p>' + description + '</p>' +
	'</div>' + 
	'</li>'

	return output;
}
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

			var buttons = getButtons(prevPageToken, nextPageToken);

			//Display Buttons 
			$('#buttons').append(buttons);
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
	'<a href="https://youtube.com/watch?v=' + videoId + '"><img src="' + thumbnails + '"/></a>' +
	'</div>' + 
	'<div class="list-right">' +
	'<h3><a href="https://youtube.com/watch?v=' + videoId + '">' + title + '</a></h3>' +
	'<small>By <span class="channelTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
	'<p>' + description + '</p>' +
	'</div>' + 
	'</li>'

	return output;
}

function getButtons(prevPageToken, nextPageToken) {
	if(!prevPageToken) {
		var btnOutput = '<div class="button-container">' +
						'<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
						'onclick="nextPage()">Next Page</button></div>';
	} else {
		var btnOutput = '<div class="button-container">' +
				'<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + q + '"' +
				'onclick="prevPage()">Previous Page</button>' +
				'<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
				'onclick="nextPage()">Next Page</button></div>';
	}

	return btnOutput;
}

// Next Page Button 
function nextPage() {
	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');

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
		pageToken: token,
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

			var buttons = getButtons(prevPageToken, nextPageToken);

			//Display Buttons 
			$('#buttons').append(buttons);
		});
}

// Previous Page Button
function prevPage() {
	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data('query');

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
		pageToken: token,
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

			var buttons = getButtons(prevPageToken, nextPageToken);

			//Display Buttons 
			$('#buttons').append(buttons);
		});
}
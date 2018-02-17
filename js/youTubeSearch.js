$(document).ready(
	function(){
		$("#form").submit(
			function(){
				event.preventDefault();
				var url = "https://www.googleapis.com/youtube/v3/search",search;
				search = $('input[name=youTubeSearch]').val();
				$.get(url,
					{
						part: "snippet",
						q: search,
						type: "video",
						key: "AIzaSyD4C6JVbbbG1BovN1I5ew8zI4wyWgUYDUw",
						maxResults:25
					}, function(data){
						installingData(data);
				});
			}
		);
	}
);

function installingData(data) {
	var finalData = {"array":parseData(data)};
	var template = $('#searchResult').html();
	var templateFunction = doT.template(template);
	var container = $('#resultsContainer').html(templateFunction(finalData));
	$('.fancybox').fancybox();
};

function parseData(data) {
	var videoLink,
		finalArray = [];

	data = data.items;
	for(var i=0 ;i<data.length;i++) {
		var finalObject = {};
		finalObject.videoId = data[i].id.videoId;
		var obj = data[i].snippet;
		finalObject.title = obj.title; 
		finalObject.description = obj.description;
		finalObject.publishedAt = obj.publishedAt;
		finalObject.channelTitle = obj.channelTitle;
		finalObject.thumbnail = obj.thumbnails.default.url;
 
		finalArray[i] = finalObject;
	}
	return finalArray;
}
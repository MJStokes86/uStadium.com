//https://ustadium-development.herokuapp.com
//http://ustadium-development.herokuapp.com/api/feeds/name/{{title}}

var title = "Original uSTADIUM";
var apiURL = "api/feeds/name";

var feedURL = "https://ustadium-development.herokuapp.com/"+apiURL+"/"+title;

$.get(feedURL)
.done(function(data) {

	
	/** 
	 * At this point we have data from the server. If you look at the output from
	 * the `/0. Request/index.html` sample. The data comes back as an array	so you
	 * can access it as data["data"]["name"] to get the name of the feed.
	 */
	
   	$("#feed h1").html(data["data"]["name"]);
   	$("#feed p").html(data["data"]["description"]);

	$("#status").hide();   	
   	$("#feed").show();
})
.fail(function(err) {
	$("#status").html("Error from "+encodeURI(feedURL));
	$( "#error" ).html("var error = "+JSON.stringify(err, null, 2));
});
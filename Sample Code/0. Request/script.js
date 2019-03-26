//https://ustadium-development.herokuapp.com
//http://ustadium-development.herokuapp.com/api/feeds/name/{{title}}

var title = "Original uSTADIUM";
var apiURL = "api/feeds/name";

var feedURL = "https://ustadium-development.herokuapp.com/"+apiURL+"/"+title;

$("#status").html("Requesting "+feedURL+" ...");

/** 
 *  You can read the documentation for the JQuery get method at
 *  http://api.jquery.com/jQuery.get/
 */ 
$.get(feedURL)
.done(function(data) {
	$("#status").html("Results from "+encodeURI(feedURL));
   	$( "#feed" ).html("var data = "+JSON.stringify(data, null, 2));
})
.fail(function(err) {
	$("#status").html("Error from "+encodeURI(feedURL));
	$( "#error" ).html("var error = "+JSON.stringify(err, null, 2));
});
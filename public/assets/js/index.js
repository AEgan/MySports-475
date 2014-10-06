$(function() {
	$( "#sortable" ).sortable();
	$( "#sortable" ).disableSelection();

	$.ajax({
		dataType: "json",
	  url: "/test"
	}).done(function(data) {
	  console.log("done");
	  console.log(data);
	}).fail(function(xhr, status, error){
		console.log(xhr);
		console.log(status);
		console.log(error);
	});
});
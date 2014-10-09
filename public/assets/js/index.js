$(function() {
	$( "#sortable" ).sortable();
	$( "#sortable" ).disableSelection();

	$.ajax({
		type: "POST",
		dataType: "json",
	  url: "/getTeamRoster",
	  data: {teamName: "MIA"}
	}).done(function(data) {
	  console.log("done");
	  console.log(data);
	}).fail(function(xhr, status, error){
		console.log(xhr);
		console.log(status);
		console.log(error);
	});

	$.ajax({
		type: "GET",
		dataType: "json",
	  url: "/nfl_team_info"
	}).done(function(data) {
	  console.log("done");
	  console.log(data);
	}).fail(function(xhr, status, error){
		console.log(xhr);
		console.log(status);
		console.log(error);
	});
	var p = "Brian Hartline"
	$.ajax({
		type: "POST",
		dataType: "json",
	  url: "/getPlayerInfo",
	  data: { player: p, team: "MIA"}
	}).done(function(data) {
	  console.log("done");
	  console.log(data);
	}).fail(function(xhr, status, error){
		console.log(xhr);
		console.log(status);
		console.log(error);
	});
});
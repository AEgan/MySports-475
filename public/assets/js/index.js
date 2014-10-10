$(function() {
	$( "#sortable" ).sortable();
	$( "#sortable" ).disableSelection();

	var p3 = "Brian Hartline"
	var t3 = "MIA"
	var box3 = '#box1'

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
	  data: { player: p3, team: t3}
	}).done(function(data) {
	  console.log("done");
	  console.log(data);
	  $(box3 + ' .sportsContent').html("<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr>Touchdowns: &nbsp;" + data.touchdowns.total+"</b><br />College: &nbsp;" + data.college +"</b><br />Draft Pick: &nbsp;" + data.draft_pick + "</b><br />Height: &nbsp;" + data.height + "in");
	}).fail(function(xhr, status, error){
		console.log(xhr);
		console.log(status);
		console.log(error);
	});


	var p = "Antonio Brown"
	var t = "PIT"
	var box = '#box3'

	$.ajax({
		type: "POST",
		dataType: "json",
	  url: "/getPlayerInfo",
	  data: { player: p, team: t}
	}).done(function(data) {
	  console.log("done");
	  console.log(data);
	  $(box + ' .sportsContent').html("<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr>Touchdowns: &nbsp;" + data.touchdowns.total+"</b><br />College: &nbsp;" + data.college +"</b><br />Draft Pick: &nbsp;" + data.draft_pick + "</b><br />Height: &nbsp;" + data.height + "in");
	}).fail(function(xhr, status, error){
		console.log(xhr);
		console.log(status);
		console.log(error);
	});


	var p2 = "Sammy Watkins"
	var t2 = "BUF"
	var box2 = '#box2'

	$.ajax({
		type: "POST",
		dataType: "json",
	  url: "/getPlayerInfo",
	  data: { player: p2, team: t2}
	}).done(function(data) {
	  console.log("done");
	  console.log(data);
	  $(box2 + ' .sportsContent').html("<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr>Touchdowns: &nbsp;" + data.touchdowns.total+"</b><br />College: &nbsp;" + data.college +"</b><br />Draft Pick: &nbsp;" + data.draft_pick + "</b><br />Height: &nbsp;" + data.height + "in");
	}).fail(function(xhr, status, error){
		console.log(xhr);
		console.log(status);
		console.log(error);
	});

	var p4 = "Cody Parkey"
	var t4 = "PHI"
	var box4 = '#box4'

	$.ajax({
		type: "POST",
		dataType: "json",
	  url: "/getPlayerInfo",
	  data: { player: p4, team: t4}
	}).done(function(data) {
	  console.log("done");
	  console.log(data);
	  $(box4 + ' .sportsContent').html("<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr>Attempts: &nbsp;" + data.field_goal.att+"</b><br /><hr>Made: &nbsp;" + data.field_goal.made+"</b><br />College: &nbsp;" + data.college +"</b><br />Draft Pick: &nbsp;" + data.draft_pick + "</b><br />Height: &nbsp;" + data.height + "in");
	}).fail(function(xhr, status, error){
		console.log(xhr);
		console.log(status);
		console.log(error);
	});

	function Popup(boxNum) {
		return 2;
	}

});
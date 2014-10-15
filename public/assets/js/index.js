
function popup(box) {
	document.getElementById("dialog-form").style.display = "block";
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


function populatePlayerList(t){
    var select = document.getElementById("playerList");
    $.ajax({
		type: "POST",
		dataType: "json",
	  url: "/getTeamRoster",
	  data: {teamName: t}
	}).done(function(data) {
	  console.log("done");
	  console.log(data);
	   for (var i = 0; i < data.length; i++) {
        var opt = data[i].player.name_full;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
	}).fail(function(xhr, status, error){
		console.log(xhr);
		console.log(status);
		console.log(error);
	});
   
}


$(function() {
 
	$( "#sortable" ).sortable();
	$( "#sortable" ).disableSelection();

	var p3 = "Brian Hartline"
	var t3 = "MIA"
	var box3 = '#box1'

	$('.form').on('submit', function() {
		event.preventDefault();
	    var val = $(this).find('input[type="text"]').val();
	    alert(val);
	    // I like to use defers :)
	    //deferred = $.post("http://somewhere.com", { val: val });

	    //deferred.success(function () {
	        // Do your stuff.
	    //});

	    //deferred.error(function () {
        // Handle any errors here.

	});
	
	$('.teamList').on('change', function () {
	    var e = document.getElementById("teams");
		var strUser = e.options[e.selectedIndex].value;
		populatePlayerList(strUser);
	    return true;
	});

	// $.ajax({
	// 	type: "POST",
	// 	dataType: "json",
	//   url: "/getTeamRoster",
	//   data: {teamName: "MIA"}
	// }).done(function(data) {
	//   console.log("done");
	//   console.log(data);
	// }).fail(function(xhr, status, error){
	// 	console.log(xhr);
	// 	console.log(status);
	// 	console.log(error);
	// });

	// $.ajax({
	// 	type: "GET",
	// 	dataType: "json",
	//   url: "/nfl_teams"
	// }).done(function(data) {
	//   console.log("done");
	//   console.log(data);
	// }).fail(function(xhr, status, error){
	// 	console.log(xhr);
	// 	console.log(status);
	// 	console.log(error);
	// });
	
	// var p = "Brian Hartline"
	// $.ajax({
	// 	type: "POST",
	// 	dataType: "json",
	//   url: "/getPlayerInfo",
	//   data: { player: p3, team: t3}
	// }).done(function(data) {
	//   console.log("done");
	//   console.log(data);
	//   $(box3 + ' .sportsContent').html("<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr>Touchdowns: &nbsp;" + data.touchdowns.total+"</b><br />College: &nbsp;" + data.college +"</b><br />Draft Pick: &nbsp;" + data.draft_pick + "</b><br />Height: &nbsp;" + data.height + "in");
	// }).fail(function(xhr, status, error){
	// 	console.log(xhr);
	// 	console.log(status);
	// 	console.log(error);
	// });


	// var p = "Antonio Brown"
	// var t = "PIT"
	// var box = '#box3'

	// $.ajax({
	// 	type: "POST",
	// 	dataType: "json",
	//   url: "/getPlayerInfo",
	//   data: { player: p, team: t}
	// }).done(function(data) {
	//   console.log("done");
	//   console.log(data);
	//   $(box + ' .sportsContent').html("<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr>Touchdowns: &nbsp;" + data.touchdowns.total+"</b><br />College: &nbsp;" + data.college +"</b><br />Draft Pick: &nbsp;" + data.draft_pick + "</b><br />Height: &nbsp;" + data.height + "in");
	// }).fail(function(xhr, status, error){
	// 	console.log(xhr);
	// 	console.log(status);
	// 	console.log(error);
	// });


	// var p2 = "Sammy Watkins"
	// var t2 = "BUF"
	// var box2 = '#box2'

	// $.ajax({
	// 	type: "POST",
	// 	dataType: "json",
	//   url: "/getPlayerInfo",
	//   data: { player: p2, team: t2}
	// }).done(function(data) {
	//   console.log("done");
	//   console.log(data);
	//   $(box2 + ' .sportsContent').html("<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr>Touchdowns: &nbsp;" + data.touchdowns.total+"</b><br />College: &nbsp;" + data.college +"</b><br />Draft Pick: &nbsp;" + data.draft_pick + "</b><br />Height: &nbsp;" + data.height + "in");
	// }).fail(function(xhr, status, error){
	// 	console.log(xhr);
	// 	console.log(status);
	// 	console.log(error);
	// });

	// var p4 = "Cody Parkey"
	// var t4 = "PHI"
	// var box4 = '#box4'

	// $.ajax({
	// 	type: "POST",
	// 	dataType: "json",
	//   url: "/getPlayerInfo",
	//   data: { player: p4, team: t4}
	// }).done(function(data) {
	//   console.log("done");
	//   console.log(data);
	//   $(box4 + ' .sportsContent').html("<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr>Attempts: &nbsp;" + data.field_goal.att+"</b><br /><hr>Made: &nbsp;" + data.field_goal.made+"</b><br />College: &nbsp;" + data.college +"</b><br />Draft Pick: &nbsp;" + data.draft_pick + "</b><br />Height: &nbsp;" + data.height + "in");
	// }).fail(function(xhr, status, error){
	// 	console.log(xhr);
	// 	console.log(status);
	// 	console.log(error);
	// });

	// var p5 = "DeMarco Murray"
	// var t5 = "DAL"
	// var box5 = '#box5'

	// $.ajax({
	// 	type: "POST",
	// 	dataType: "json",
	//   url: "/getPlayerInfo",
	//   data: { player: p5, team: t5}
	// }).done(function(data) {
	//   console.log("done");
	//   console.log(data);
	//   $(box5 + ' .sportsContent').html("<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr>Touchdowns: &nbsp;" + data.touchdowns.total+"</b><br /><hr>Rushing Yards: &nbsp;" + data.rushing.yds+"</b><br />College: &nbsp;" + data.college +"</b><br />Draft Pick: &nbsp;" + data.draft_pick + "</b><br />Height: &nbsp;" + data.height + "in");
	// }).fail(function(xhr, status, error){
	// 	console.log(xhr);
	// 	console.log(status);
	// 	console.log(error);
	// });

	// var p6 = "Andrew Luck"
	// var t6 = "IND"
	// var box6 = '#box6'

	// $.ajax({
	// 	type: "POST",
	// 	dataType: "json",
	//   url: "/getPlayerInfo",
	//   data: { player: p6, team: t6}
	// }).done(function(data) {
	//   console.log("done");
	//   console.log(data);
	//   $(box6 + ' .sportsContent').html("<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr>Touchdowns: &nbsp;" + data.touchdowns.total+"</b><br /><hr>Passing Touchdowns: &nbsp;" + data.passing.td+"</b><br /><hr>Passing Yards: &nbsp;" + data.passing.yds+"</b><br />College: &nbsp;" + data.college +"</b><br />Draft Pick: &nbsp;" + data.draft_pick + "</b><br />Height: &nbsp;" + data.height + "in");
	// }).fail(function(xhr, status, error){
	// 	console.log(xhr);
	// 	console.log(status);
	// 	console.log(error);
	// });

	// var p7 = "Donnie Jones"
	// var t7 = "PHI"
	// var box7 = '#box7'

	// $.ajax({
	// 	type: "POST",
	// 	dataType: "json",
	//   url: "/getPlayerInfo",
	//   data: { player: p7, team: t7}
	// }).done(function(data) {
	//   console.log("done");
	//   console.log(data);
	//   $(box7 + ' .sportsContent').html("<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr>Punts: &nbsp;" + data.punting.punts+"</b><br />College: &nbsp;" + data.college +"</b><br />Draft Pick: &nbsp;" + data.draft_pick + "</b><br />Height: &nbsp;" + data.height + "in");
	// }).fail(function(xhr, status, error){
	// 	console.log(xhr);
	// 	console.log(status);
	// 	console.log(error);
	// });

	var t8 = "PHI"
	var box8 = '#box8'

	$.ajax({
		type: "POST",
		dataType: "json",
	  url: "/getTeamInfo",
	  data: {team: t8}
	}).done(function(data) {
	  console.log("done");
	  console.log(data);
	  displayData(box8, t8, data, "nflTeam");
	}).fail(function(xhr, status, error){
		console.log(xhr);
		console.log(status);
		console.log(error);
	});






	function displayData(box, t, data, dataCategory) {
		switch (dataCategory) {
			case "nflPlayer":
				break;
			case "nflTeam":
				$(box + ' .sportsContent').html("<b>"+t+" &nbsp;" +"</b><br />Offense: Total Touchdowns: &nbsp;" + data.touchdowns.total+"<br />Defense: Total Tackles &nbsp;"+data.defense.force_fum+"<br />Defense: Interceptions &nbsp;"+data.defense.int+"Punts: &nbsp;"+data.punting.punts);
				break;
			case "nflStats":
				break;
			default:
				break;
		}
	}


	

});
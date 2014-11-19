
var boxNumber = "";
var nextBoxNumber = 2
var box_team = new Array();

function getData (box, urlText, league, category, d, t) {
		if(t) {
			t = t.toUpperCase();
		}

		var arrayNew = new Array();
		arrayNew.push(box);
		arrayNew.push(league);
		box_team.push(arrayNew);
		console.log(box_team);
		console.log(d);
		console.log(urlText);

		$.ajax({

		type: "POST",
		dataType: "json",
	  	url: urlText,
	  	data: d
		}).done(function(data) {

		  console.log("done");
		  console.log(data);
		  displayData(box, data, league, category, t);
		}).fail(function(xhr, status, error){
			console.log(xhr);
			console.log(status);
			console.log(error);
		});
		return true;
}

function displayData(box, data, league, category, t) {
	switch (league) {
		case "nfl":
			switch (category) {
				case "player":
					console.log("ASDASDASD");
					$(box + ' .sportsWrapper').css("backgroundImage", "url('assets/images/logos/"+t.toLowerCase()+".png')");
					var statsHTML = setBoxHTML(data);
					var modalHTML = setModalHTML(data);
					$(box + ' .sportsContent').html(statsHTML);
					$(box + ' > .modal').html(modalHTML);
					break;
				case "team":
					$(box + ' .sportsWrapper').css("backgroundImage", "url('assets/images/logos/"+t.toLowerCase()+".png')");
					var boxNum = box.charAt(box.length -1);
					$(box + ' .sportsContent').html("<b>"+displayTeamName(t)+" &nbsp;" +"</b><br /><hr><b>Offense</b><br/> Third Down Efficiency: &nbsp;" + roundToTwo(data.third_down_efficiency.pct)+"%<br />Red Zone Efficiency: &nbsp;" + roundToTwo(data.redzone_efficiency.pct)+"%<br /><br/><b>Defense</b><br/> Forced fumbles: &nbsp;"+data.defense.force_fum+"<br />Interceptions: &nbsp;"+data.defense.int+"<br/>Punts: &nbsp;"+data.punting.punts);
					$('.modal-trigger-area').css("display", "block");
					$(box + ' > .modal').html("here it is");
					setModals();
					break;
				case "standings":
					setNFLStandingsHTML(data, function(tableString, modalString) {
						var displayModalText = "<a href="
						$(box + ' .sportsContent').html("<b><u> Standings for " + data.name + "</u></b><br />" + tableString);
						$(box + ' > .modal').html("<b><u> Standings for " + data.name + "</u></b><br />" + modalString);
					});
					break;
			}
			break;
		case "nhl":
			switch (category) {
				case "team":
					$(box + ' .sportsContent').html("we out here");
					break;
				case "player":
					//implement nhl player stats here
					break;
				case "standings":
					var str = "<table class='standings-table'><thead><th>Team</th><th>Wins</th><th>Losses</th><th>OTL</th><th>Points</th></thead><tbody>";
					for(var i = 0; i < data.teams.length; i++) {
						str += "<tr><td>" + data.teams[i]['name'] + "</td>";
						str += "<td>" + data.teams[i]['wins'] + "</td>";
						str += "<td>" + data.teams[i]['losses'] + "</td>";
						str += "<td>" + data.teams[i]['overtime_losses'] + "</td>";
						str += "<td>" + data.teams[i]['points'] + "</td></tr>"
					}
					str += "</tbody></table>";
					$(box + ' .sportsContent').html("<b><u> Standings for " + data.name + " conference</u></b><br />" + str);
					$(box + ' > .modal').html("here it is");
					break;
			}
			break;
		case "nba":
			switch (category) {
				case "team":
					//implement nba team stats here
					break;
				case "player":
					//implement nba player stats here
					break;
				case "standings":
					//implement nba standings stats here
					break;
			}
			break;
		case "mlb":
			switch (category) {
				case "team":
					//implement mlb team stats here
					break;
				case "player":
					//implement mlb player stats here
					break;
				case "standings":
					//implement mlb standings stats here
					break;
			}
			break;
	}
}

function setNFLStandingsHTML(data, callback) {
	var tableStr = "<table class='standings-table'><thead><th>Team</th><th>Wins</th><th>Losses</th><th>Ties</th></thead><tbody>";
	for(var i = 0; i < data.teams.length; i++) {
		tableStr += "<tr><td>" + data.teams[i]['name'] + "</td>";
		tableStr += "<td>" + data.teams[i]['overall']['wins'] + "</td>";
		tableStr += "<td>" + data.teams[i]['overall']['losses'] + "</td>";
		tableStr += "<td>" + data.teams[i]['overall']['ties'] + "</td></tr>";
	}
	tableStr += "</tbody></table>";
	var modalString = "<table class='standings-table'><thead><th>Team</th><th>Wins</th><th>Losses</th><th>Ties</th><th>Last 5</th><th>Streak</th><th>Point Differential</th><th>Scored First</th><th>Leading At Half</th><th>Decided by 7</th></thead><tbody>";
	for(var i = 0; i < data.teams.length; i++) {
		modalString += "<tr><td>" + data.teams[i]['name'] + "</td>";
		modalString += "<td>" + data.teams[i]['overall']['wins'] + "</td>";
		modalString += "<td>" + data.teams[i]['overall']['losses'] + "</td>";
		modalString += "<td>" + data.teams[i]['overall']['ties'] + "</td>";
		modalString += "<td>" + data.teams[i]['last_5']['wins'] + '-' + data.teams[i]['last_5']['losses'] + "-" + data.teams[i]['last_5']['ties'] + "</td>";
		modalString += "<td>" + data.teams[i]['streak']['type'] + " " + data.teams[i]['streak']['length'] + "</td>";
		modalString += "<td>" + data.teams[i]['points']['net'] + "</td>";
		modalString += "<td>" + data.teams[i]['scored_first']['wins'] + '-' + data.teams[i]['scored_first']['losses'] + "-" + data.teams[i]['scored_first']['ties'] + "</td>";
		modalString += "<td>" + data.teams[i]['leading_at_half']['wins'] + '-' + data.teams[i]['leading_at_half']['losses'] + "-" + data.teams[i]['leading_at_half']['ties'] + "</td>";
		modalString += "<td>" + data.teams[i]['decided_by_7_points']['wins'] + '-' + data.teams[i]['decided_by_7_points']['losses'] + "-" + data.teams[i]['decided_by_7_points']['ties'] + "</td></tr>";
	}
	return callback(tableStr, modalString);
}

function setBoxHTML(data) {
	var position = data.position;
	var summary = render("summary_header", data);
	switch(position) {
		case "QB":
			summary += render("summary_quarterback", data);
			break;
		case "WR":
			summary += render("summary_wide_receiver", data);
			break;
		case "RB":
			summary += render("summary_running_back", data);
			break;
		default:
			summary += "Working on it"
			break;
	}
	return summary;
}

// MODAL
function setModalHTML(data) {
	var position = data.position;
	// QUARTERBACK
	if(position === "QB") {
		return render("basicInfo", data) + render("passing", data) + render("rushing", data) + render("fumbles", data);
	} else if(position === "WR") { // WIDE RECEIVER
		var modalString = render("basicInfo", data) + render("receiving", data);

		if(parseInt(data.penalty.num) != 0) {
			console.log("IM HERE");
			modalString += render("penalties", data);
		}
		if(parseInt(data.kick_return.returns) != 0) {
			modalString += render("kick_returns", data);
		}
		if(parseInt(data.punt_return.returns) != 0) {
			modalString += render("punt_returns", data);
		}
		return modalString;

	} else if(position === "RB") { // RUNNING BACK
		var modalString = render("basicInfo", data) + render("rushing", data) + render("receiving", data);

		if(parseInt(data.penalty.num) != 0) {
			modalString += render("penalties", data);
		}
		if(parseInt(data.kick_return.returns) != 0) {
			modalString += render("kick_returns", data);
		}
		if(parseInt(data.punt_return.returns) != 0) {
			modalString += render("punt_returns", data);
		}
		return modalString;

	} else {
		return "We're working on it";
	}
}

function popup(box) {
	$("#teamRadio").prop("checked", true);
	box2 = box.substr(1);
	console.log(box2);
	var p = getElementTopLeft(box2);
	console.log(p.top);
	document.getElementById("players").style.display = "none";
	document.getElementById("standingsDropdowns").style.display = "none";
	document.getElementById("nhlStandingsDropdowns").style.display = "none";
	document.getElementById("dialog-form").style.left = p.left +"px";
	document.getElementById("dialog-form").style.top = p.top + "px";
	document.getElementById("dialog-form").style.display = "block";
	document.getElementById("submit").style.display = "block";
	document.getElementById("nhlTeamDropdown").style.display = "none";
	boxNumber = "";
	boxNumber = box;
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

function populatePlayerList(t, league){
	console.log('populatePlayerList');
    var select = document.getElementById("playerList");
		select.className += select.className ? ' chosen-select' : 'chosen-select';

    select.options.length = 0;

    console.log(t);
    switch (league) {
    	case "nfl":
		    $.ajax({
				type: "POST",
				dataType: "json",
			  url: "/getTeamRoster",
			  data: {teamName: t}
			}).done(function(data) {
			  //alert("done");
			  console.log("done");
			  console.log(data);
			   for (var i = 0; i < data.length - 1; i++) {
		        var opt = data[i].player.name_last + ", " + data[i].player.name_first;
		        var el = document.createElement("option");
		        el.textContent = opt;
		        el.value = data[i].player.name_full;
		        select.appendChild(el);
		      }
					setChosen();
					console.log("here");
					$(".chosen-select").trigger("chosen:updated");
			}).fail(function(xhr, status, error){
				//alert("fail");
				console.log(xhr);
				console.log(status);
				console.log(error);
			});
    		break;
    	case "nhl":
    		$.ajax({
				type: "POST",
				dataType: "json",
			  url: "/getNHLTeamRoster",
			  data: {teamName: t}
			}).done(function(data) {
			  //alert("done");
			  console.log("done");
			  console.log(data);
			   for (var i = 0; i < data.length - 1; i++) {
		        var opt = data[i].player.name_last + ", " + data[i].player.name_first;
		        var el = document.createElement("option");
		        el.textContent = opt;
		        el.value = data[i].player.name_full;
		        select.appendChild(el);
		      }
					setChosen();
					console.log("here");
					$(".chosen-select").trigger("chosen:updated");
			}).fail(function(xhr, status, error){
				//alert("fail");
				console.log(xhr);
				console.log(status);
				console.log(error);
			});
    		break;
    }

}

//function to set styling on filtering by league
function set_filter(league) {
	for (var i = 0; i < box_team.length; i++) {
		if (box_team[i][1] == league) {
			$(box_team[i][0]).css("display", "block");
		}
		else {
			$(box_team[i][0]).css("display", "none");
		}
		if (league == "noFilter") {
			$(box_team[i][0]).css("display", "block");
		}
	};
};

// Main Function
$(function() {
	
	// Login button
	$('#login').on('click', function (e) {
		e.preventDefault();
		var username = $('#username').val()
		var password = $('#password').val()
		$.ajax({
			type: "POST",
			dataType: "json",
		  	url: "/login",
		  	data: {username: username, password: password}
			}).done(function(data) {
			  console.log("done");
			  console.log(data);
			  
			}).fail(function(xhr, status, error){
				console.log("NOOOOOO");
				console.log(xhr);
				console.log(status);
				console.log(error);
		});
	});


	$( "#sortable" ).sortable();
	$( "#sortable" ).disableSelection();


	$('.form').on('submit', function (e) {
		e.preventDefault();
		document.getElementById("dialog-form").style.display = "none";
		var league = $(this).find("input[name='league']:checked").val()
    	var category = $(this).find("input[name='category']:checked").val()
    	console.log(category);
    	var t = $(this).find('select[name="team"]').val();
    	var p = $(this).find('select[name="player"]').val();
		var c = $(this).find('select[name="conference"]').val();
		var d = c + "_" + $(this).find('select[name="division"]').val();
		var nhlConference = $(this).find('select[name="nhlConference"]').val();
		var nhlTeam = $(this).find('select[name="nhlTeam"]').val();
	    switch(league) {
	    	case "nfl":
	    		switch (category) {
			    	case "team":
			    		console.log("IN CASE STATEMENT TEAM");
			    		data = {team: t}
			    		getData(boxNumber, "/getTeamInfo", league, category, data, t);
			    		break;
			    	case "player":
				    	console.log("IN CASE STATEMENT PLAYER");
				    	data = { player: p, team: t};
				    	getData(boxNumber, "/getPlayerInfo", league, category, data, t);
			    		break;
					case "standings":
						console.log("IN CASE STATEMENT standings");
						data = { conference: c, division: d };
						console.log(data);
						getData(boxNumber, "/getNFLStandings", league, category, data);
						break;
				}
				break;
			case "nhl": 
				switch (category) {
					case "team":
						console.log("IN CASE STATEMENT NHL TEAM");
						console.log(nhlTeam);
						console.log(category);
						console.log(league);
						data = { team: nhlTeam };
						getData(boxNumber, "/getNHLTeamInfo", league, category, data, nhlTeam);
						break;
					case "player":
						console.log("IN CASE STATEMENT NHL PLAYER");
						//add nhl player info here
						break;
					case "standings":
						console.log("IN CASE STATEMENT NHL STANDINGS");
						data = { conference: nhlConference };
						getData(boxNumber, "/getNHLStandings", league, category, data);
						break;
				}
				break;
			case "nba": 
				switch (category) {
					case "team":
						console.log("IN CASE STATEMENT NBA TEAM");
						break;
					case "player":
						console.log("IN CASE STATEMENT NBA PLAYER");
						break;
					case "standings":
						console.log("IN CASE STATEMENT NBA STANDINGS");
						break;	
				}
				break;
			case "mlb": 
				switch (category) {
					case "team":
						console.log("IN CASE STATEMENT MLB TEAM");
						break;
					case "player":
						console.log("IN CASE STATEMENT MLB PLAYER");
						break;
					case "standings":
						console.log("IN CASE STATEMENT MLB STANDINGS");
						break;	
				}
				break;
	    	default:
		    	console.log("IN CASE STATEMENT DEFAULT");
	    		break;
	    }

	    nextBoxID = "box" + nextBoxNumber;
	   	$('#sortable').append('<li class="ui-state-default" id="' + nextBoxID + '"><div class="sportsWrapper"><div id="logo"></div><div class="sportsContent"><a id = "' + nextBoxID + '" onclick="popup(\'#' + nextBoxID + '\')" class="button addNew">Add Sports Data</a></div><div class="modal-trigger-area"><a href="#modal' + nextBoxNumber + '" class="modal-trigger">More Details</a></div></div><div id="modal' + nextBoxNumber + '" class="modal"></div></li>');
	   	$("#" + nextBoxID + ' .modal-trigger-area').css("display", "none");

	    nextBoxNumber += 1;
		setModals();
	
	    // deferred = $.post("http://somewhere.com", { val: val });

	    // deferred.success(function () {
	    //     Do your stuff.
	    // });

	    // deferred.error(function () {
     //    Handle any errors here.});
	});

	$('.teamList').on('change', function () {
		if ($("input[name='category']:checked").val() == "player") {
		    //player is checked so populate team list
		    var league = $("input[name='league']:checked").val();
		    var team = "";
		    switch (league){
		    	case "nfl":
		    		var e = document.getElementById("teams");
					team = e.options[e.selectedIndex].value;
					break;
				case "nhl":
					var e = document.getElementById("nhlTeamDropdown");
					team = e.options[e.selectedIndex].value;
		    }    
			populatePlayerList(team, league);
		}
		return true
	});


	$( ".filterOption" ).on( "click", function() {
		$( ".filterOption" ).css("background-color", "#DDD");
		$( ".filterOption" ).css("border-bottom", "2px solid #334");
		$(this).css("background-color", "#17C7CA");
		$(this).css("border-bottom", "none");

		var filter = $(this).prop('id');
		console.log(filter);
		set_filter(filter);
	});

	// var boxOne = "#box1";
	// $.ajax({
	// 	type: "GET",
	// 	dataType: "json",
	//   url: "/getNFLStandings"
	// }).done(function(data) {
	//   console.log("standings done yo");
	//   console.log(data);
	//   team0 = data.teams[0]['name']
	//   team1 = data.teams[1]['name']
	//   team2 = data.teams[2]['name']
	//   team3 = data.teams[3]['name']
	//   console.log(team0)
	//   $(boxOne + ' .sportsContent').html("<b><u> Standings </u></b><br />" + team0 + "<br />" + team1 + "<br />" + team2 + "<br />" + team3);
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

});


function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function getElementTopLeft(id) {
    var ele = document.getElementById(id);
    var top = 0;
    var left = 0;
    while(ele.tagName != "BODY") {
        top += ele.offsetTop;
        left += ele.offsetLeft;
        ele = ele.offsetParent;
    }
    return { top: top, left: left };
}

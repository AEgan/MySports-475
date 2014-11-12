var boxNumber = "";
var nextBoxNumber = 2
var box_team = new Array();


function displayData(box, data, dataCategory, t) {
		switch (dataCategory) {
			case "player":
				console.log("ASDASDASD");
				$(box + ' .sportsWrapper').css("backgroundImage", "url('assets/images/logos/"+t.toLowerCase()+".png')");
				var statsHTML = setBoxHTML(data);
				var modalHTML = setModalHTML(data);
				$(box + ' .sportsContent').html(statsHTML);
				$('.modal-trigger-area').css("display", "block");
				$(box + ' > .modal').html(modalHTML);
				break;
			case "team":
				$(box + ' .sportsWrapper').css("backgroundImage", "url('assets/images/logos/"+t.toLowerCase()+".png')");
				var boxNum = box.charAt(box.length -1);
				$(box + ' .sportsContent').html("<b>"+displayTeamName(t)+" &nbsp;" +"</b><br /><hr><b>Offense</b><br/> Third Down Efficiency: &nbsp;" + roundToTwo(data.third_down_efficiency.pct)+"%<br />Red Zone Efficiency: &nbsp;" + roundToTwo(data.redzone_efficiency.pct)+"%<br /><br/><b>Defense</b><br/> Forced fumbles: &nbsp;"+data.defense.force_fum+"<br />Interceptions: &nbsp;"+data.defense.int+"<br/>Punts: &nbsp;"+data.punting.punts + "<br/><a href='#modal" + boxNum + "' class='modal-trigger'>See More</a>");
				$('.modal-trigger-area').css("display", "block");
				$(box + ' > .modal').html("here it is");
				setModals();
				$('.modal-trigger-area').css("display", "block");
				break;
			case "stats":
				break;
			case "standings":
				setNFLStandingsHTML(data, function(tableString, modalString) {
					var displayModalText = "<a href="
					$(box + ' .sportsContent').html("<b><u> Standings for " + data.name + "</u></b><br />" + tableString);
					$(box + ' > .modal').html("<b><u> Standings for " + data.name + "</u></b><br />" + modalString);
				});
					break;
			case "nhlStandings":
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
			case "nhlTeam":
				$(box + ' .sportsContent').html("we out here");
				$('.modal-trigger-area').css("display", "block");
				break;
			default:
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
	var str = "<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr />";
	str += "<table class='player-stats-table'>";
	switch(position) {
		case "WR":
			str += "<tr><td>Total TDs: </td><td>" + data.touchdowns.total + "</td></tr>";
			str += "<tr><td>Receptions: </td><td>" + data.receiving.rec + "</td></tr>";
			str += "<tr><td>Yards: </td><td>" + data.receiving.yds + "</td></tr>";
			str += "<tr><td>Long: </td><td>" + data.receiving.lg + "</td></tr>";
			str += "<tr><td>First Downs: </td><td>" + data.receiving.fd + "</td></tr>";
			break;
		case "QB":
			str = getQBDataStrings(data);
			break;
		case "RB":
			str += "<tr><td>Rushing Attempts: </td><td>" + data.rushing.att + "</td></tr>";
			str += "<tr><td>Rushing Yards: </td><td>" + data.rushing.yds + "</td></tr>";
			str += "<tr><td>Average: </td><td>" + data.rushing.avg + "</td></tr>";
			str += "<tr><td>Rushing TDs: </td><td>" + data.rushing.td + "</td></tr>";
			str += "<tr><td>Receptions: </td><td>" + data.receiving.rec + "</td></tr>";
			str += "<tr><td>Receiving Yards: </td><td>" + data.receiving.yds + "</td></tr>";
			str += "<tr><td>Receiving TDs: </td><td>" + data.receiving.td + "</td></tr>";
			break;
		default:
			break;
	}
	str += "</table>";
	return str;
}

function setModalHTML(data) {
	var position = data.position;
	if(position === "QB") {
		var modalString = "<h1>" + position + " " + data.name_full + "</h1>";
		modalString += "<h2>Background</h2>";
		modalString += "<table class='player-stats-table'>";
		modalString += "<tr><td>Home Town: </td><td>" + data.birth_place + "</td></tr>";
		modalString += "<tr><td>Birthdate: </td><td>" + data.birthdate + "</td></tr>";
		modalString += "<tr><td>High School: </td><td>" + data.high_school + "</td></tr>";
		modalString += "<tr><td>College: </td><td>" + data.college + "</td></tr>";
		modalString += "<tr><td>Draft: </td><td>" + "Round " + data.draft_round + ", " + data.draft_pick + " overall" + "</td></tr>";
		modalString += "<tr><td>Years in League: </td><td>" + data.experience + "</td></tr>";
		modalString += "<tr><td>Height: </td><td>" + inchesToHeight(data.height) + "</td></tr>";
		modalString += "<tr><td>Weight: </td><td>" + data.weight + "lbs" + "</td></tr>";
		modalString += "<tr><td>Jersey Number: </td><td>" + data.jersey_number + "</td></tr></table>";

		modalString += "<h2>Passing</h2>";
		modalString += "<table class='player-stats-table'>";
		modalString += "<tr><td>Attempts: </td><td>" + data.passing.att + "</td></tr>";
		modalString += "<tr><td>Completions: </td><td>" + data.passing.cmp + "</td></tr>";
		modalString += "<tr><td>Completion Percentage: </td><td>" + data.passing.cmp_pct + "</td></tr>";
		modalString += "<tr><td>Yards: </td><td>" + data.passing.yds + "</td></tr>";
		modalString += "<tr><td>Yards/Reception: </td><td>" + data.passing.cmp_avg + "</td></tr>";
		modalString += "<tr><td>Long: </td><td>" + data.passing.lg + "</td></tr>";
		modalString += "<tr><td>Touchdowns: </td><td>" + data.passing.td + "</td></tr>";
		modalString += "<tr><td>INTs: </td><td>" + data.passing.int + "</td></tr>";
		modalString += "<tr><td>Pick-6: </td><td>" + data.passing.int_td + "</td></tr>";
		modalString += "<tr><td>Sacks: </td><td>" + data.passing.sk + "</td></tr>";
		modalString += "<tr><td>Sack yards lost: </td><td>" + data.passing.sk_yds + "</td></tr>";
		modalString += "</table>";

		modalString += "<h2>Rushing</h2>";
		modalString += "<table class='player-stats-table'>";
		modalString += "<tr><td>Attempts: </td><td>" + data.rushing.att + "</td></tr>";
		modalString += "<tr><td>Yards: </td><td>" + data.rushing.yds + "</td></tr>";
		modalString += "<tr><td>Average: </td><td>" + data.rushing.avg + "</td></tr>";
		modalString += "<tr><td>Long: </td><td>" + data.rushing.lg + "</td></tr>";
		modalString += "<tr><td>Touchdowns: </td><td>" + data.rushing.td + "</td></tr>";
		modalString += "</table>";

		modalString += "<h2>Fumbles</h2>";
		modalString += "<table class='player-stats-table'>";
		modalString += "<tr><td>Total: </td><td>" + data.fumbles.fum + "</td></tr>";
		modalString += "<tr><td>Lost: </td><td>" + data.fumbles.lost + "</td></tr>";
		modalString += "</table>";

		return modalString;
	} else if(position === "WR") {
		var modalString = "<h1>" + position + " " + data.name_full + "</h1>";
		modalString += "<h2>Background</h2>";
		modalString += "<table class='player-stats-table'>";
		modalString += "<tr><td>Home Town: </td><td>" + data.birth_place + "</td></tr>";
		modalString += "<tr><td>Birthdate: </td><td>" + data.birthdate + "</td></tr>";
		modalString += "<tr><td>High School: </td><td>" + data.high_school + "</td></tr>";
		modalString += "<tr><td>College: </td><td>" + data.college + "</td></tr>";
		modalString += "<tr><td>Draft: </td><td>" + "Round " + data.draft_round + ", " + data.draft_pick + " overall" + "</td></tr>";
		modalString += "<tr><td>Years in League: </td><td>" + data.experience + "</td></tr>";
		modalString += "<tr><td>Height: </td><td>" + inchesToHeight(data.height) + "</td></tr>";
		modalString += "<tr><td>Weight: </td><td>" + data.weight + "lbs" + "</td></tr>";
		modalString += "<tr><td>Jersey Number: </td><td>" + data.jersey_number + "</td></tr></table>";

		modalString += "<h2>Receiving</h2>";
		modalString += "<table class='player-stats-table'>";
		modalString += "<tr><td>Receptions: </td><td>" + data.receiving.rec + "</td></tr>";
		modalString += "<tr><td>Yards: </td><td>" + data.receiving.yds + "</td></tr>";
		modalString += "<tr><td>Average: </td><td>" + data.receiving.avg + "</td></tr>";
		modalString += "<tr><td>Long: </td><td>" + data.receiving.lg + "</td></tr>";
		modalString += "<tr><td>Touchdowns: </td><td>" + data.receiving.td + "</td></tr>";
		modalString += "<tr><td>Yards After Catch: </td><td>" + data.receiving.yac + "</td></tr>";
		modalString += "<tr><td>First Downs: </td><td>" + data.receiving.fd + "</td></tr>";
		modalString += "</table>";

		if(parseInt(data.penalty.num) != 0) {
			modalString += "<h2>Penalties</h2>"
			modalString += "<table class='player-stats-table'>";
			modalString += "<tr><td>Number: </td><td>" + data.penalty.num + "</td></tr>";
			modalString += "<tr><td>Yards: </td><td>" + data.penalty.yds + "</td></tr>";
			modalString += "</table>";
		}
		if(parseInt(data.kick_return.returns) != 0) {
			modalString += "<h2>Kick Returns</h2>"
			modalString += "<table class='player-stats-table'>";
			modalString += "<tr><td>Number: </td><td>" + data.kick_return.returns + "</td></tr>";
			modalString += "<tr><td>Yards: </td><td>" + data.kick_return.yds + "</td></tr>";
			modalString += "<tr><td>Touchdowns: </td><td>" + data.kick_return.td + "</td></tr>";
			modalString += "<tr><td>Average: </td><td>" + data.kick_return.avg + "</td></tr>";
			modalString += "<tr><td>Long: </td><td>" + data.kick_return.lg + "</td></tr>";
			modalString += "</table>";
		}
		if(parseInt(data.punt_return.returns) != 0) {
			modalString += "<h2>Kick Returns</h2>"
			modalString += "<table class='player-stats-table'>";
			modalString += "<tr><td>Number: </td><td>" + data.punt_return.returns + "</td></tr>";
			modalString += "<tr><td>Yards: </td><td>" + data.punt_return.yds + "</td></tr>";
			modalString += "<tr><td>Touchdowns: </td><td>" + data.punt_return.td + "</td></tr>";
			modalString += "<tr><td>Average: </td><td>" + data.punt_return.avg + "</td></tr>";
			modalString += "<tr><td>Long: </td><td>" + data.punt_return.lg + "</td></tr>";
			modalString += "<tr><td>Fair Catches: </td><td>" + data.punt_return.fc + "</td></tr>";
			modalString += "</table>";
		}
		return modalString;
	} else if(position === "RB") {
		var modalString = "<h1>" + position + " " + data.name_full + "</h1>";
		modalString += "<h2>Background</h2>";
		modalString += "<table class='player-stats-table'>";
		modalString += "<tr><td>Home Town: </td><td>" + data.birth_place + "</td></tr>";
		modalString += "<tr><td>Birthdate: </td><td>" + data.birthdate + "</td></tr>";
		modalString += "<tr><td>High School: </td><td>" + data.high_school + "</td></tr>";
		modalString += "<tr><td>College: </td><td>" + data.college + "</td></tr>";
		modalString += "<tr><td>Draft: </td><td>" + "Round " + data.draft_round + ", " + data.draft_pick + " overall" + "</td></tr>";
		modalString += "<tr><td>Years in League: </td><td>" + data.experience + "</td></tr>";
		modalString += "<tr><td>Height: </td><td>" + inchesToHeight(data.height) + "</td></tr>";
		modalString += "<tr><td>Weight: </td><td>" + data.weight + "lbs" + "</td></tr>";
		modalString += "<tr><td>Jersey Number: </td><td>" + data.jersey_number + "</td></tr></table>";

		modalString += "<h2>Rushing</h2>";
		modalString += "<table class='player-stats-table'>";
		modalString += "<tr><td>Attempts: </td><td>" + data.rushing.att + "</td></tr>";
		modalString += "<tr><td>Yards: </td><td>" + data.rushing.yds + "</td></tr>";
		modalString += "<tr><td>Average: </td><td>" + data.rushing.avg + "</td></tr>";
		modalString += "<tr><td>Long: </td><td>" + data.rushing.lg + "</td></tr>";
		modalString += "<tr><td>Touchdowns: </td><td>" + data.rushing.td + "</td></tr>";
		modalString += "</table>";

		modalString += "<h2>Receiving</h2>";
		modalString += "<table class='player-stats-table'>";
		modalString += "<tr><td>Receptions: </td><td>" + data.receiving.rec + "</td></tr>";
		modalString += "<tr><td>Yards: </td><td>" + data.receiving.yds + "</td></tr>";
		modalString += "<tr><td>Average: </td><td>" + data.receiving.avg + "</td></tr>";
		modalString += "<tr><td>Long: </td><td>" + data.receiving.lg + "</td></tr>";
		modalString += "<tr><td>Touchdowns: </td><td>" + data.receiving.td + "</td></tr>";
		modalString += "<tr><td>Yards After Catch: </td><td>" + data.receiving.yac + "</td></tr>";
		modalString += "<tr><td>First Downs: </td><td>" + data.receiving.fd + "</td></tr>";
		modalString += "</table>";

		if(parseInt(data.penalty.num) != 0) {
			modalString += "<h2>Penalties</h2>"
			modalString += "<table class='player-stats-table'>";
			modalString += "<tr><td>Number: </td><td>" + data.penalty.num + "</td></tr>";
			modalString += "<tr><td>Yards: </td><td>" + data.penalty.yds + "</td></tr>";
			modalString += "</table>";
		}
		if(parseInt(data.kick_return.returns) != 0) {
			modalString += "<h2>Kick Returns</h2>"
			modalString += "<table class='player-stats-table'>";
			modalString += "<tr><td>Number: </td><td>" + data.kick_return.returns + "</td></tr>";
			modalString += "<tr><td>Yards: </td><td>" + data.kick_return.yds + "</td></tr>";
			modalString += "<tr><td>Touchdowns: </td><td>" + data.kick_return.td + "</td></tr>";
			modalString += "<tr><td>Average: </td><td>" + data.kick_return.avg + "</td></tr>";
			modalString += "<tr><td>Long: </td><td>" + data.kick_return.lg + "</td></tr>";
			modalString += "</table>";
		}
		if(parseInt(data.punt_return.returns) != 0) {
			modalString += "<h2>Kick Returns</h2>"
			modalString += "<table class='player-stats-table'>";
			modalString += "<tr><td>Number: </td><td>" + data.punt_return.returns + "</td></tr>";
			modalString += "<tr><td>Yards: </td><td>" + data.punt_return.yds + "</td></tr>";
			modalString += "<tr><td>Touchdowns: </td><td>" + data.punt_return.td + "</td></tr>";
			modalString += "<tr><td>Average: </td><td>" + data.punt_return.avg + "</td></tr>";
			modalString += "<tr><td>Long: </td><td>" + data.punt_return.lg + "</td></tr>";
			modalString += "<tr><td>Fair Catches: </td><td>" + data.punt_return.fc + "</td></tr>";
			modalString += "</table>";
		}
		return modalString;
	} else {
		return "We're working on it";
	}
}

function inchesToHeight(inchString) {
	var inchInt = parseInt(inchString);
	var feet = Math.floor(inchInt / 12);
	var inches = inchInt % 12;
	return "" + feet + "'" + inches + "\"";
}

function getQBDataStrings(data) {
	var position = data.position;
	var tableString = "<b>"+data.position+" &nbsp;" + data.name_full+"</b><br /><hr />";
	tableString += "<table class='player-stats-table'>";
	tableString += "<tr><td>Passing Attempts: </td><td>" + data.passing.att + "</td></tr>";
	tableString += "<tr><td>Completions: </td><td>" + data.passing.cmp + "</td></tr>";
	tableString += "<tr><td>Yards: </td><td>" + data.passing.yds + "</td></tr>";
	tableString += "<tr><td>Touchdowns: </td><td>" + data.passing.td + "</td></tr>";
	tableString += "<tr><td>INTs: </td><td>" + data.passing.int + "</td></tr>";
	tableString += "<tr><td>QBR: </td><td>" + data.passing.rating + "</td></tr>";
	return tableString;
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

function populatePlayerList(t){
	console.log('populatePlayerList');
    var select = document.getElementById("playerList");
		select.className += select.className ? ' chosen-select' : 'chosen-select';

    select.options.length = 0;
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

}

function getData (box, urlText, dataCategory, d, t) {
		if(t) {
			t = t.toUpperCase();
		}

		var arrayNew = new Array();
		arrayNew.push(box);
		arrayNew.push(dataCategory);
		box_team.push(arrayNew);
		console.log("arrayNew");
		console.log(arrayNew);
		console.log(box_team);

		$.ajax({

		type: "POST",
		dataType: "json",
	  	url: urlText,
	  	data: d
		}).done(function(data) {

		  console.log("done");
		  console.log(data);
		  displayData(box, data, dataCategory, t);
		}).fail(function(xhr, status, error){
			console.log(xhr);
			console.log(status);
			console.log(error);
		});
		return true;
}


$(function() {
 	$( ".radioButtons" ).on( "click", function() {
 		if ($("input[name='category']:checked").val() == "player") {
			document.getElementById("team-select-fields").style.display = "";
 			document.getElementById("players").style.display = "block";
			document.getElementById("standingsDropdowns").style.display = "none";
			document.getElementById("nhlStandingsDropdowns").style.display = "none";
			document.getElementById("nhlTeamDropdown").style.display = "none";
 			var e = document.getElementById("teams");
			var strUser = e.options[e.selectedIndex].value;
			populatePlayerList(strUser);
		}
 		if ($("input[name='category']:checked").val() == "team") {
			document.getElementById("teams").style.display = "block";
			document.getElementById("team-select-fields").style.display = "";
 			document.getElementById("players").style.display = "none";
			document.getElementById("standingsDropdowns").style.display = "none";
			document.getElementById("nhlStandingsDropdowns").style.display = "none";
			document.getElementById("nhlTeamDropdown").style.display = "none";
 		}
		if ($("input[name='category']:checked").val() == "standings") {
			document.getElementById("standingsDropdowns").style.display = "block";
			document.getElementById("players").style.display = "none";
			document.getElementById("team-select-fields").style.display = "none";
			document.getElementById("nhlStandingsDropdowns").style.display = "none";
			document.getElementById("nhlTeamDropdown").style.display = "none";
		}
		if ($("input[name='category']:checked").val() == "nhlStandings") {
			document.getElementById("standingsDropdowns").style.display = "none";
			document.getElementById("players").style.display = "none";
			document.getElementById("team-select-fields").style.display = "none";
			document.getElementById("nhlStandingsDropdowns").style.display = "block";
			document.getElementById("nhlTeamDropdown").style.display = "none";
		}
		if ($("input[name='category']:checked").val() == "nhlTeam") {
			document.getElementById("standingsDropdowns").style.display = "none";
			document.getElementById("players").style.display = "none";
			document.getElementById("team-select-fields").style.display = "none";
			document.getElementById("nhlStandingsDropdowns").style.display = "none";
			document.getElementById("nhlTeamDropdown").style.display = "block";
		}
 		return true;
 	});



	$( "#sortable" ).sortable();
	$( "#sortable" ).disableSelection();


	$('.form').on('submit', function (e) {
		e.preventDefault();
		document.getElementById("dialog-form").style.display = "none";

    	var category = $(this).find("input[name='category']:checked").val()
    	console.log(category);
    	var t = $(this).find('select[name="team"]').val();
    	var p = $(this).find('select[name="player"]').val();
		var c = $(this).find('select[name="conference"]').val();
		var d = c + "_" + $(this).find('select[name="division"]').val();
		var nhlConference = $(this).find('select[name="nhlConference"]').val();
		var nhlTeam = $(this).find('select[name="nhlTeam"]').val();
	    switch(category) {
	    	case "team":
	    		console.log("IN CASE STATEMENT TEAM");
	    		data = {team: t}
	    		getData(boxNumber, "/getTeamInfo", category, data, t);
	    		break;
	    	case "player":
		    	console.log("IN CASE STATEMENT PLAYER");
		    	data = { player: p, team: t};
		    	getData(boxNumber, "/getPlayerInfo", category, data, t);
	    		break;
			case "standings":
				console.log("IN CASE STATEMENT standings");
				data = { conference: c, division: d };
				console.log(data);
				getData(boxNumber, "/getNFLStandings", category, data);
				break;
			case "nhlStandings":
				console.log("IN CASE STATEMENT NHL STANDINGS");
				data = { conference: nhlConference };
				getData(boxNumber, "/getNHLStandings", category, data);
				break;
			case "nhlTeam":
				console.log("IN CASE STATEMENT NHL TEAM");
				data = { team: nhlTeam };
				getData(boxNumber, "/getNHLTeamInfo", category, data, nhlTeam);
				break;
	    	default:
		    	console.log("IN CASE STATEMENT DEFAULT");
	    		break;

	    }

	    nextBoxID = "box" + nextBoxNumber;
	   	$('#sortable').append('<li class="ui-state-default" id="' + nextBoxID + '"><div class="sportsWrapper"><div id="logo">&nbsp;</div><div class="sportsContent"><a id = "' + nextBoxID + '" onclick="popup(\'#' + nextBoxID + '\')" class="button addNew">Add Sports Data</a></div><div class="modal-trigger-area"><a href="#modal' + nextBoxNumber + '" class="modal-trigger">More Details</a></div></div><div id="modal' + nextBoxNumber + '" class="modal"></div></li>');
	   	
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
		    var e = document.getElementById("teams");
				var strUser = e.options[e.selectedIndex].value;
				populatePlayerList(strUser);
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
		switch(filter) {
			case "nfl":
				console.log("NFL");
				for (var i = 0; i < box_team.length; i++) {
					if (box_team[i][1] == "team" || box_team[i][1] == "player" || box_team[i][1] == "standings") {
						console.log("TEAM");
					}
					else {
						box2 = box_team[i][0].substr(1);
						$(box2).css("display", "none");
					}

				};
				break;
			case "nhl":
				console.log("NHL");
				for (var i = 0; i < box_team.length; i++) {
					if (box_team[i][1] == "team" || box_team[i][1] == "player" || box_team[i][1] == "standings") {
						box2 = box_team[i][0].substr(1);
						$(box2).css("display", "none");
					} 
				};
				break;
			default:
				break;
		}

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






function displayTeamName (team) {
	var t = team.toLowerCase();
	switch (t) {
		case "ari": return "Arizona Cardinals"; break;
        case "atl": return "Atlanta Falcons"; break;
        case "bal": return "Baltimore Ravens"; break;
        case "buf": return "Buffalo Bills"; break;
        case "car": return "Carolina Panthers"; break;
        case "chi": return "Chicago Bears"; break;
        case "cin": return "Cincinnati Bengals"; break;
        case "cle": return "Cleveland Browns"; break;
        case "dal": return "Dallas Cowboys"; break;
        case "den": return "Denver Broncos"; break;
        case "det": return "Detroit Lions"; break;
        case "gb": return "Green Bay Packers"; break;
        case "hou": return "Houston Texans"; break;
        case "ind": return "Indianapolis Colts"; break;
        case "jac": return "Jacksonville Jaguars"; break;
        case "kc": return "Kansas City Chiefs"; break;
        case "mia": return "Miami Dolphins"; break;
        case "min": return "Minnesota Vikings"; break;
        case "ne": return "New England Patriots"; break;
        case "no": return "New Orleans Saints"; break;
        case "nyg": return "New York Giants"; break;
        case "nyj": return "New York Jets"; break;
        case "oak": return "Oakland Raiders"; break;
        case "phi": return "Philadelphia Eagles"; break;
        case "pit": return "Pittsburgh Steelers"; break;
        case "sd": return "San Diego Chargers"; break;
        case "sf": return "San Francisco 49ers"; break;
        case "sea": return "Seattle Seahawks"; break;
        case "stl": return "St Louis Rams"; break;
        case "tb": return "Tampa Bay Buccaneers"; break;
        case "ten": return "Tennessee Titans"; break;
        case "was": return "Washington Redskins"; break;
        default: return team.toUpperCase(); break;
    }
}

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

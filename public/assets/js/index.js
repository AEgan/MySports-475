
var boxNumber = "";
var mainUser = "Varun";
var mainPassword = "test";
var nextBoxNumber = 1;
var box_team = new Array();
var current_tiles = {};

function getData (box, urlText, league, category, d, t, infoArray) {
		if(t) {
			t = t.toUpperCase();
		}
		console.log("infoArray IS HERE");
		console.log(infoArray);

		var arrayNew = new Array();
		arrayNew.push("#box" + String(box));
		arrayNew.push(league);
		box_team.push(arrayNew);

		$.ajax({
			type: "POST",
			dataType: "json",
		  	url: urlText,
		  	data: infoArray
		}).done(function(tile) {
			infoArray.data = tile.data;
			current_tiles["box" + String(box)] = tile;
			displayData(box, tile.data, league, category, t);
		}).fail(function(xhr, status, error){
			console.log(xhr);
			console.log(status);
			console.log(error);
		});
		return true;
}

function displayData(box, data, league, category, t) {
	console.log("DISPLAY DATA");
	box = "#box" + String(box);
	$(box).removeClass('unsortable');
	$(box + ' .addData').removeClass('addData');
	switch (league) {
		case "nfl":
			switch (category) {
				case "player":
					$(box + ' .sportsWrapper').css("backgroundImage", "url('assets/images/logos/"+t.toLowerCase()+".png')");
					var statsHTML = setBoxHTML(data);
					var modalHTML = setModalHTML(data);
					$(box + ' .sportsContent').html(statsHTML);
					$(box + ' > .modal').html(modalHTML);
					break;
				case "team":
					$(box + ' .sportsWrapper').css("backgroundImage", "url('assets/images/logos/"+t.toLowerCase()+".png')");
					$(box + ' .sportsContent').html("<b>"+displayTeamName(t)+" &nbsp;" +"</b><br /><hr><b>Offense</b><br/> Third Down Efficiency: &nbsp;" + roundToTwo(data.third_down_efficiency.pct)+"%<br />Red Zone Efficiency: &nbsp;" + roundToTwo(data.redzone_efficiency.pct)+"%<br /><br/><b>Defense</b><br/> Forced fumbles: &nbsp;"+data.defense.force_fum+"<br />Interceptions: &nbsp;"+data.defense.int+"<br/>Punts: &nbsp;"+data.punting.punts);
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
					$(box + ' .sportsWrapper').css("backgroundImage", "url('assets/images/logos/nhl/"+data.alias.toLowerCase()+".png')");
					$(box + ' .sportsContent').html(render('summary_nhl_team', data));
					break;
				case "player":
					$(box + ' .sportsWrapper').css("backgroundImage", "url('assets/images/logos/nhl/"+data.team.alias.toLowerCase()+".png')");
					//implement nhl player stats here
					if(data.position === "g" || data.position === "G") {
						$(box + ' .sportsContent').html(render('summary_nhl_goalie', data));
						$(box + ' > .modal').html(render('summary_nhl_goalie_modal', data));
					} else {
						$(box + ' .sportsContent').html(render('summary_nhl_skater', data));
						$(box + ' > .modal').html(render('summary_nhl_skater_modal', data));
					}
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
					$(box + ' > .modal').html(render('summary_nhl_standings_modal', data));
					break;
			}
			break;
		case "nba":
			switch (category) {
				case "team":
					//implement nba team stats here
					$(box + ' .sportsWrapper').css("backgroundImage", "url('assets/images/logos/nba/"+data.alias.toLowerCase()+".png')");
					$(box + ' .sportsContent').html(render('summary_nba_team', data));
					break;
				case "player":
					//implement nba player stats here
					$(box + ' .sportsWrapper').css("backgroundImage", "url('assets/images/logos/nba/"+data.team.alias.toLowerCase()+".png')");
					globalPlayer = data;
					$(box + ' .sportsContent').html(render('summary_nba_player', JSON.parse(data)));
					$(box + ' > .modal').html(render('modal_nba_player', JSON.parse(data)));
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

		if(data.penalty && parseInt(data.penalty.num) != 0) {
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

		if(data.penalty && parseInt(data.penalty.num) != 0) {
			modalString += render("penalties", data);
		}
		if(data.kick_return && parseInt(data.kick_return.returns) != 0) {
			modalString += render("kick_returns", data);
		}
		if(data.punt_return && parseInt(data.punt_return.returns) != 0) {
			modalString += render("punt_returns", data);
		}
		return modalString;

	} else {
		return "We're working on it";
	}
}

function popup(box) {
	console.log("DA FUCK");
	$('.filterOption').off();
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
	document.getElementById("nbaTeamDropdown").style.display = "none";
	boxNumber = box;
	element_to_scroll_to = document.getElementById('dialog-form');
	element_to_scroll_to.scrollIntoView();
}

function popupNextBox () {
	console.log(nextBoxID);
	popup("#" + nextBoxID);
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
	console.log("populate player list");
	console.log(league);
	var select = document.getElementById("playerList");
	select.className += select.className ? ' chosen-select' : 'chosen-select';

	select.options.length = 0;
	console.log('populatePlayerList');
	if(league === 'nfl' || league === 'NFL') {
	    $.ajax({
			type: "POST",
			dataType: "json",
		  url: "/getTeamRoster",
		  data: {teamName: t}
		}).done(function(data) {
		  //alert("done");
		  console.log("done");
		  console.log(data);
		   for (var i = 0; i < data.length; i++) {
	        var opt = data[i].name_last + ", " + data[i].name_first;
	        var el = document.createElement("option");
	        el.textContent = opt;
	        el.value = data[i].name_full;
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
	} else if (league === 'nhl' || league === 'NHL') {
		t = $("#nhlTeams").val();
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "/getNHLTeamRoster",
			data: {teamName: t}
		}).done(function(data) {
			for (var i = 0; i < data.length; i++) {
				var opt = data[i].last_name + ", " + data[i].first_name;
				var el = document.createElement("option");
				el.textContent = opt;
				el.value = data[i].id;
				select.appendChild(el);
			}
			setChosen();
			$(".chosen-select").trigger("chosen:updated");
		}).fail(function(xhr, status, error) {
			console.log(xhr);
			console.log(status);
			console.log(error);
		});
	} else {
		t = $("#nbaTeams").val();
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "/getNBATeamRoster",
			data: {teamName: t}
		}).done(function(data) {
			for (var i = 0; i < data.length; i++) {
				var opt = data[i].last_name + ", " + data[i].first_name;
				var el = document.createElement("option");
				el.textContent = opt;
				el.value = data[i].id;
				select.appendChild(el);
			}
			setChosen();
			$(".chosen-select").trigger("chosen:updated");
		}).fail(function(xhr, status, error) {
			console.log(xhr);
			console.log(status);
			console.log(error);
		});
	}
}

//function to set styling on filtering by league
function set_filter(league) {
	console.log("FILTERING")
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
	populateUserTiles();
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

			}).fail(function(xhr, status, error){
				console.log(xhr);
				console.log(status);
				console.log(error);
		});
	});


	$( "#sortable" ).sortable({
		stop: function (e) {
			saveOrder();
		},
		items: "li:not(.unsortable)"

	});
	$( "#sortable" ).disableSelection();


	$('.form').on('submit', function (e) {
		e.preventDefault();
		$(".filterOption").on('click', function() {
			filterOptionToggle(this);
		});
		document.getElementById("dialog-form").style.display = "none";
		var league = $(this).find("input[name='league']:checked").val()
	  	var category = $(this).find("input[name='category']:checked").val()
	  	var t = $(this).find('select[name="team"]').val();
	  	var p = $(this).find('select[name="player"]').val();
		var c = $(this).find('select[name="conference"]').val();
		var d = c + "_" + $(this).find('select[name="division"]').val();
		var nhlConference = $(this).find('select[name="nhlConference"]').val();
		var nhlTeam = $(this).find('select[name="nhlTeam"]').val();
		var nbaTeam = $(this).find('select[name="nbaTeam"]').val();
		createTile(league, category, t, p, c, d, nhlConference, nhlTeam, nbaTeam);
		nextBoxID = "box" + nextBoxNumber;
	   	newBox = render("outline", {num: nextBoxNumber});
	  	$('#sortable').append(newBox);
	});

	$('.teamList').on('change', function () {
		if ($("input[name='category']:checked").val() == "player") {
		    //player is checked so populate team list
		    var e = document.getElementById("teams");
				var strUser = e.options[e.selectedIndex].value;
				console.log(strUser);
				populatePlayerList(strUser);
		}
		return true
	});

	$(".filterOption").on('click', function() {
		filterOptionToggle(this);
	});

});

function filterOptionToggle(element) {
	console.log("BITCHES");
	$('.filterOption').removeClass('filterSelected');
	$(element).addClass('filterSelected');

	var filter = $(element).prop('id');
	set_filter(filter);
}

function createTile(league, category, t, p, c, d, nhlConference, nhlTeam, nbaTeam) {
	infoArray = {league: league, category: category, t: t, p: p, c: c, d: d, nhlConference: nhlConference, nhlTeam: nhlTeam, boxNum: nextBoxNumber, nbaTeam: nbaTeam};
	switch(league) {
	    	case "nfl":
	    		switch (category) {
			    	case "team":
			    		console.log("IN CASE STATEMENT TEAM");
			    		data = {team: t}
			    		getData(nextBoxNumber, "/getTeamInfo", league, category, data, t, infoArray);
			    		break;
			    	case "player":
				    	console.log("IN CASE STATEMENT PLAYER");
				    	data = { player: p, team: t};
				    	getData(nextBoxNumber, "/getPlayerInfo", league, category, data, t, infoArray);
			    		break;
					case "standings":
						console.log("IN CASE STATEMENT standings");
						data = { conference: c, division: d };
						console.log(data);
						getData(nextBoxNumber, "/getNFLStandings", league, category, data, t, infoArray);
						break;
				}
				break;
			case "nhl":
				switch (category) {
					case "team":
						console.log("IN CASE STATEMENT NHL TEAM");
						data = { team: nhlTeam };
						getData(nextBoxNumber, "/getNHLTeamInfo", league, category, data, nhlTeam, infoArray);
						break;
					case "player":
						console.log("IN CASE STATEMENT NHL PLAYER");
						getData(nextBoxNumber, "/getNHLPlayerInfo", league, category, data, nhlTeam, infoArray);
						break;
					case "standings":
						console.log("IN CASE STATEMENT NHL STANDINGS");
						data = { conference: nhlConference };
						getData(nextBoxNumber, "/getNHLStandings", league, category, data, t, infoArray);
						break;
				}
				break;
			case "nba":
				switch (category) {
					case "team":
						console.log("IN CASE STATEMENT NBA TEAM");
						data = { team: nbaTeam };
						getData(nextBoxNumber, "/getNBATeamInfo", league, category, data, t, infoArray);
						break;
					case "player":
						console.log("IN CASE STATEMENT NBA PLAYER");
						data = { player: p, team: nbaTeam}
						getData(nextBoxNumber, "/getNBAPlayerInfo", league, category, data, t, infoArray);
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
	    nextBoxNumber += 1;


			setModals();
}

function populateUserTiles() {
	$.ajax({
		type: "GET",
		dataType: "json",
  	url: "/get_tiles",
	}).done(function(data) {
  	for (var i = 0; i < data.length; i++) {
	  	var newtile = data[i];
	  	createTile(newtile.league, newtile.category, newtile.t, newtile.p, newtile.c, newtile.d, newtile.nhlConference, newtile.nhlTeam, newtile.nbaTeam);
	  	nextBoxID = "box" + nextBoxNumber;
	  	newBox = render("outline", {num: nextBoxNumber});
	  	$('#sortable').append(newBox);
	  }
	  var idsInOrder = $("#sortable").sortable("toArray");
	  console.log(idsInOrder);
	}).fail(function(xhr, status, error){
		console.log(xhr);
		console.log(status);
		console.log(error);
	});
}

function saveOrder() {
	var sorted = $('#sortable').sortable("toArray");
	console.log("SAVE ORDER");
	console.log(sorted);
	var new_sorted = sorted.map(function(t) {
		return current_tiles[t];
	});
	console.log(new_sorted);
	if (new_sorted.length > 0) {
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "/save_order",
			data: {new_order: new_sorted}
		}).done(function(data) {

		}).fail(function(xhr, status, error){
			console.log(xhr);
			console.log(status);
			console.log(error);
		});
	}
}

function deleteTile(element) {
	console.log(element);
	var $liElement = $(element).closest('li');
	var liid = $liElement.attr('id')
	console.log($liElement.attr('id'));
	var tile = current_tiles[liid];
	delete current_tiles[liid];
	$liElement.remove();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "/delete_custom",
		data: {tile: tile}
	}).done(function(data) {
		saveOrder();
	}).fail(function(xhr, status, error){
		console.log(xhr);
		console.log(status);
		console.log(error);
	});

}

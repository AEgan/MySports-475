$(function() {
	$( ".radioButtons" ).on( "click", function() {
		console.log("change");
		switch ($("input[name='league']:checked").val()) {
			case "nfl":
				console.log("inNFL");
					switch ($("input[name='category']:checked").val()) {
						case "player":
							console.log("nflPlayer");
							document.getElementById("team-select-fields").style.display = "";
				 			document.getElementById("players").style.display = "block";
							document.getElementById("standingsDropdowns").style.display = "none";
							document.getElementById("nhlStandingsDropdowns").style.display = "none";
							document.getElementById("nhlTeamDropdown").style.display = "none";
							document.getElementById("nbaTeamDropdown").style.display = "none";
				 			var e = document.getElementById("teams");
							var strUser = e.options[e.selectedIndex].value;
							populatePlayerList(strUser, "nfl");
							break;
						case "team":
							console.log("nflTeam");
							document.getElementById("team-select-fields").style.display = "";
				 			document.getElementById("players").style.display = "none";
							document.getElementById("standingsDropdowns").style.display = "none";
							document.getElementById("nhlStandingsDropdowns").style.display = "none";
							document.getElementById("nhlTeamDropdown").style.display = "none";
							document.getElementById("nbaTeamDropdown").style.display = "none";
							break;
						case "standings":
							console.log("nflStandings");
							document.getElementById("standingsDropdowns").style.display = "block";
							document.getElementById("players").style.display = "none";
							document.getElementById("team-select-fields").style.display = "none";
							document.getElementById("nhlStandingsDropdowns").style.display = "none";
							document.getElementById("nhlTeamDropdown").style.display = "none";
							document.getElementById("nbaTeamDropdown").style.display = "none";
							break;
					}
					break;
			case "nhl":
					switch ($("input[name='category']:checked").val()) {
						case "player":
							console.log("nhlPlayer");
							document.getElementById("nhlTeamDropdown").style.display = "block";
							document.getElementById("team-select-fields").style.display = "none";
				 			document.getElementById("players").style.display = "block";
							document.getElementById("standingsDropdowns").style.display = "none";
							document.getElementById("nhlStandingsDropdowns").style.display = "none";
							document.getElementById("nbaTeamDropdown").style.display = "none";
				 			var e = document.getElementById("teams");
							var strUser = e.options[e.selectedIndex].value;
							populatePlayerList(strUser, "nhl");
							break;
						case "team":
							document.getElementById("standingsDropdowns").style.display = "none";
							document.getElementById("players").style.display = "none";
							document.getElementById("team-select-fields").style.display = "none";
							document.getElementById("nhlStandingsDropdowns").style.display = "none";
							document.getElementById("nhlTeamDropdown").style.display = "block";
							document.getElementById("nbaTeamDropdown").style.display = "none";
							break;
						case "standings":
							document.getElementById("standingsDropdowns").style.display = "none";
							document.getElementById("players").style.display = "none";
							document.getElementById("team-select-fields").style.display = "none";
							document.getElementById("nhlStandingsDropdowns").style.display = "block";
							document.getElementById("nhlTeamDropdown").style.display = "none";
							document.getElementById("nbaTeamDropdown").style.display = "none";
							break;
					}
					break;
			case "nba":
					switch ($("input[name='category']:checked").val()) {
						case "player":
							document.getElementById("standingsDropdowns").style.display = "none";
							document.getElementById("nbaTeamDropdown").style.display = "block";
							document.getElementById("team-select-fields").style.display = "none";
							document.getElementById("nhlStandingsDropdowns").style.display = "none";
							document.getElementById("nhlTeamDropdown").style.display = "none";
							document.getElementById("players").style.display = "block";
							populatePlayerList(strUser, "nba");
							break;
						case "team":
							document.getElementById("players").style.display = "none";
							document.getElementById("standingsDropdowns").style.display = "none";
							document.getElementById("nbaTeamDropdown").style.display = "block";
							document.getElementById("team-select-fields").style.display = "none";
							document.getElementById("nhlStandingsDropdowns").style.display = "none";
							document.getElementById("nhlTeamDropdown").style.display = "none";
							break;
						case "standings":
							document.getElementById("nbaTeamDropdown").style.display = "none";
							document.getElementById("team-select-fields").style.display = "none";
							break;
					}
					break;
			case "mlb":
					switch ($("input[name='category']:checked").val()) {
						case "player":

							break;
						case "team":

							break;
						case "standings":

							break;
					}
					break;
		}
 		return true;
 	});
});

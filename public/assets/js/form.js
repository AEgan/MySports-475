$(function() {
	$( ".radioButtons" ).on( "click", function() {
 		if ($("input[name='category']:checked").val() == "player") {
 			console.log("ONE");
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
 			console.log("TWO");
			// document.getElementById("teams").style.display = "block";
			document.getElementById("team-select-fields").style.display = "";
 			document.getElementById("players").style.display = "none";
			document.getElementById("standingsDropdowns").style.display = "none";
			document.getElementById("nhlStandingsDropdowns").style.display = "none";
			document.getElementById("nhlTeamDropdown").style.display = "none";
 		}
		if ($("input[name='category']:checked").val() == "standings") {
			console.log("THREE");
			document.getElementById("standingsDropdowns").style.display = "block";
			document.getElementById("players").style.display = "none";
			document.getElementById("team-select-fields").style.display = "none";
			document.getElementById("nhlStandingsDropdowns").style.display = "none";
			document.getElementById("nhlTeamDropdown").style.display = "none";
		}
		if ($("input[name='category']:checked").val() == "nhlStandings") {
			console.log("FOUR");
			document.getElementById("standingsDropdowns").style.display = "none";
			document.getElementById("players").style.display = "none";
			document.getElementById("team-select-fields").style.display = "none";
			document.getElementById("nhlStandingsDropdowns").style.display = "block";
			document.getElementById("nhlTeamDropdown").style.display = "none";
		}
		if ($("input[name='category']:checked").val() == "nhlTeam") {
			console.log("FIVE");
			document.getElementById("standingsDropdowns").style.display = "none";
			document.getElementById("players").style.display = "none";
			document.getElementById("team-select-fields").style.display = "none";
			document.getElementById("nhlStandingsDropdowns").style.display = "none";
			document.getElementById("nhlTeamDropdown").style.display = "block";
		}
 		return true;
 	});
});
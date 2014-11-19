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
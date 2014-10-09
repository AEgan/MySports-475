# ---------------- NFL ----------------------
# Get all players for a team
def getTeamRoster(teamName)
	all_players = SportsDataApi::Nfl.team_roster(teamName).players
	return all_players
end
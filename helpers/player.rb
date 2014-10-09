# ---------------- NFL ----------------------

# Get player info
def getPlayerInfo(playerName, teamName)
	SportsDataApi.set_key(:nfl, ENV['NFLKEY'])
	SportsDataApi.set_access_level(:nfl, 't')
	all_players = getTeamRoster(teamName)
	basicPlayerInformation = all_players.find {|p| p.player[:name_full] == playerName }.player

	player_season_stats = SportsDataApi::Nfl.player_season_stats(teamName, "2014", "REG")
	playerStats = player_season_stats.players.find{|p| p[:id] == basicPlayerInformation[:id]}[:stats]

	touchdownsHash = playerStats.find {|s| s.touchdowns}.touchdowns
	totalTouchDowns = touchdownsHash.reduce(0) {|total, (key, val)| total += val.to_i}
	basicPlayerInformation = {:touchdowns => totalTouchDowns}.merge(basicPlayerInformation)

	return basicPlayerInformation
end
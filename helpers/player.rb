# ---------------- NFL ----------------------

# Get player info
def getPlayerInfo(playerName, teamName)
	# Set API Keys
	SportsDataApi.set_key(:nfl, ENV['NFLKEY'])
	SportsDataApi.set_access_level(:nfl, 't')

	# Get all players in the team
	all_players = getTeamRoster(teamName)

	# Get basic information of input player
	basicPlayerInformation = all_players.find {|p| p.player[:name_full] == playerName }.player

	# Get stats for the input player
	player_season_stats = SportsDataApi::Nfl.player_season_stats(teamName, "2014", "REG")
	playerStats = player_season_stats.players.find{|p| p[:id] == basicPlayerInformation[:id]}[:stats]

	# Get position of the player
	position = basicPlayerInformation[:position]
	stats = {}

	case position
	when "WR"
		stats = wideReceiver(playerStats)
	when "K"
		stats = kicker(playerStats)
	when "RB"
		stats = runningBack(playerStats)
	when "QB"
		stats = quarterBack(playerStats)
	when "TE"
		stats = tightEnd(playerStats)
	when "P"
		stats = punter(playerStats)
	end
		
	basicPlayerInformation = stats.merge(basicPlayerInformation)

	return basicPlayerInformation
end

def wideReceiver(playerStats)
	touchdowns = playerStats.find {|s| s.touchdowns}.touchdowns
	totalTouchDowns = touchdowns.reduce(0) {|total, (key, val)| total += val.to_i}
	touchdowns = {:touchdowns => {:total => totalTouchDowns}.merge(touchdowns)}

	receiving = {:receiving => playerStats.find {|s| s.receiving}.receiving}

	stats = [touchdowns, receiving]
	stats = stats.inject(&:merge)
	return stats
end

def kicker(playerStats)
	true
end

def runningBack(playerStats)
	true
end

def quarterBack(playerStats)
	true
end

def tightEnd(playerStats)
	true
end

def punter(playerStats)
	true
end

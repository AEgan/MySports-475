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
	
	touchdowns = getTouchdowns(playerStats)
	receiving = getReceiving(playerStats)
	penalty = getPenalty(playerStats)
	punt_return = getPuntReturn(playerStats)
	kick_return = getKickReturn(playerStats)

	stats = [touchdowns, receiving, penalty, punt_return, kick_return]
	stats = stats.reduce(&:merge)
	return stats
end

def kicker(playerStats)
	field_goal = getFieldGoal(playerStats)
	kickoffs = getKickOffs(playerStats)
	extra_point = getExtraPoint(playerStats)

	stats = [field_goal, kickoffs, extra_point]
	stats = stats.reduce(&:merge)
	return stats
end

def runningBack(playerStats)
	touchdowns = getTouchdowns(playerStats)
	receiving = getReceiving(playerStats)
	penalty = getPenalty(playerStats)
	punt_return = getPuntReturn(playerStats)
	kick_return = getKickReturn(playerStats)
	rushing = getRushing(playerStats)

	stats = [touchdowns, receiving, penalty, punt_return, kick_return, rushing]
	stats = stats.reduce(&:merge)
	return stats
end

def quarterBack(playerStats)
	touchdowns = getTouchdowns(playerStats)
	rushing = getRushing(playerStats)
	penalty = getPenalty(playerStats)
	fumbles = getFumbles(playerStats)
	passing = getPassing(playerStats)
	first_downs = getFirstDowns(playerStats)

	stats = [touchdowns, penalty, rushing, fumbles, passing, first_downs]
	stats = stats.reduce(&:merge)
	return stats
end

def tightEnd(playerStats)
	touchdowns = getTouchdowns(playerStats)
	receiving = getReceiving(playerStats)
	penalty = getPenalty(playerStats)
	punt_return = getPuntReturn(playerStats)
	kick_return = getKickReturn(playerStats)

	stats = [touchdowns, receiving, penalty, punt_return, kick_return]
	stats = stats.reduce(&:merge)
	return stats
end

def punter(playerStats)
	punting = getPunting(playerStats)

	stats = [punting]
	stats = stats.reduce(&:merge)
	return stats
end

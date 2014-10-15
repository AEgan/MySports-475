# ---------------- NFL ----------------------
# Get all players for a team
def getTeamRoster(teamName)
	all_players = SportsDataApi::Nfl.team_roster(teamName).players
	return all_players
end

# Get Team Stats
def getTeamInfo(teamName)
	# Set API Keys
	# SportsDataApi.set_key(:nfl, ENV['NFLKEY'])
	SportsDataApi.set_key(:nfl, 'dsvqbre5qxsqkp5aemgtpgt2')
	SportsDataApi.set_access_level(:nfl, 't')

	# Get stats for the input player
	team_season_stats = SportsDataApi::Nfl.team_season_stats(teamName, "2014", "REG").stats

	touchdowns = getTouchdowns(team_season_stats)
	receiving = getReceiving(team_season_stats)
	penalty = getPenalty(team_season_stats)
	punt_return = getPuntReturn(team_season_stats)
	kick_return = getKickReturn(team_season_stats)
	field_goal = getFieldGoal(team_season_stats)
	kickoffs = getKickOffs(team_season_stats)
	extra_point = getExtraPoint(team_season_stats)
	rushing = getRushing(team_season_stats)
	fumbles = getFumbles(team_season_stats)
	passing = getPassing(team_season_stats)
	first_downs = getFirstDowns(team_season_stats)
	punting = getPunting(team_season_stats)
	defense = getDefense(team_season_stats)
	third_down_efficiency = getThirdDownEfficiency(team_season_stats)
	fourth_down_efficiency = getFourthDownEfficiency(team_season_stats)
	redzone_efficiency = getRedzoneEfficiency(team_season_stats)
	goal_efficiency = getGoalEfficiency(team_season_stats)
	# two_point_conversion = getTwoPointConversion(team_season_stats)

	stats = [touchdowns, receiving, penalty, punt_return, kick_return, field_goal, kickoffs, extra_point, rushing, fumbles, passing, first_downs, punting, defense, third_down_efficiency, fourth_down_efficiency, redzone_efficiency, goal_efficiency]
	stats = stats.reduce(&:merge)
	return stats
end
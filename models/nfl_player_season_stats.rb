class NFLPlayerSeasonStats
	include Mongoid::Document
	field :team
	field :player_season_stats
	field :season
end

def storeSeasonStats(team, season, allStats, all_players)
	stats = NFLPlayerSeasonStats.where({team: team, season: season})
	if stats == []
		puts "YO DAWGGGG"

		players_with_touchdowns = []
		players = allStats.players
		players.each do |a|
			pStats = a[:stats]
			touchdowns = pStats.select {|a| !a.touchdowns.nil?}.first
			if !touchdowns.nil?
				touchdowns = touchdowns.touchdowns
				totalTouchDowns = touchdowns.reduce(0) {|total, (key, val)| total += val.to_i}
				name = all_players.find{|p| p["id"] == a[:id]}["name_last"]
				players_with_touchdowns.push({tds: totalTouchDowns, name: name})
			end
		end

		players_with_touchdowns = players_with_touchdowns.sort_by{|a| a["tds"]}
		newStats = NFLPlayerSeasonStats.new
		newStats.team = team
		newStats.season = season
		newStats.player_season_stats = players_with_touchdowns
		newStats.save

		puts newStats.player_season_stats
	end
	puts "OUT HERE BRAH"
end

post '/get_season_stats' do
	content_type :json
	team = request["team"].upcase
	season = request["season"]
	stats = NFLPlayerSeasonStats.where({team: team, season: season})
	return stats[0].player_season_stats.to_json
end
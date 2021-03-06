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

				# if basicPlayerInformation['id'].nil?
				# 	playerStats = player_season_stats.players.find{|p| p[:id] == basicPlayerInformation[:id]}[:stats]
				# else
				# 	playerStats = player_season_stats.players.find{|p| p[:id] == basicPlayerInformation['id']}[:stats]
				# end
				def getName(all_players, a)
					all_players.each do |p|
						if p["id"].nil?
							if p[:id] == a[:id]
								puts "ONEONE"
								return p
							end
						elsif p["id"] == a[:id]
							puts "TWOTWO"
							puts p
							return p
						end
					end
					return nil
				end
				name = getName(all_players, a)
				if !name.nil?
					puts "THENAMEYOYOYO"
					puts name
					name = name["name_last"]
					players_with_touchdowns.push({tds: totalTouchDowns, name: name})
				end
			end
		end

		players_with_touchdowns = players_with_touchdowns.sort_by{|a| a["tds"]}
		newStats = NFLPlayerSeasonStats.new
		newStats.team = team
		newStats.season = season
		newStats.player_season_stats = players_with_touchdowns
		newStats.save
	end
	puts "OUT HERE BRAH"
end

post '/get_season_stats' do
	SportsDataApi.set_key(:nfl, 'pzgb7v6v55z9bpzccfb6rttx')
	SportsDataApi.set_access_level(:nfl, 't')
	content_type :json
	team = request["team"].upcase
	season = request["season"]
	allStats = {}
	stats = NFLPlayerSeasonStats.where({team: team, season: season})
	stats2 = NFLPlayerSeasonStats.where({team: team, season: "2013"})

	if stats == []
		all_players = getTeamRoster(team)
		player_season_stats = SportsDataApi::Nfl.player_season_stats(team, season, "REG")
		storeSeasonStats(team, season, player_season_stats, all_players)
	end
	stats = NFLPlayerSeasonStats.where({team: team, season: season})

	if stats2 == []
		all_players = getTeamRoster(team)

		player_season_stats = SportsDataApi::Nfl.player_season_stats(team, "2013", "REG")
		storeSeasonStats(team, "2013", player_season_stats, all_players)
	end
	stats2 = NFLPlayerSeasonStats.where({team: team, season: "2013"})

	allStats["statsPrev"] = stats[0].player_season_stats
	allStats["statsCurrent"] = stats2[0].player_season_stats
	return allStats.to_json
end
# ---------------- NFL ----------------------
# Get information for a player
post '/getNFLStandings' do
	content_type :json
	check_custom = get_custom_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])
	if check_custom == []
		check_tile = get_tile_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])

		if check_tile == []
			newInfo = getNFLStandings(request["c"], request["d"])
			custom = create_custom(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], newInfo)
			return custom.tile.to_json
		else
			custom = create_custom(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], check_tile[0].data)
			return check_tile[0].to_json
		end
	else 
		return check_custom[0].tile.to_json
	end
end

post '/getNHLStandings' do
	content_type :json
	check_custom = get_custom_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])
	if check_custom == []
		check_tile = get_tile_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])

		if check_tile == []
			newInfo = getNHLStandings(request["nhlConference"])
			custom = create_custom(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], newInfo)
			return custom.tile.to_json
		else
			custom = create_custom(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], check_tile[0].data)
			return check_tile[0].to_json
		end
	else 
		return check_custom[0].tile.to_json
	end
end

# post '/getNBAStandings' do
# 	content_type :json
# 	check_tile = get_tile_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])
# 	if check_tile == []
# 		newInfo = getNBAStandings(request["nhlConference"])
# 		create_tile(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], newInfo)
# 		return newInfo.to_json
# 	else
# 		return check_tile[0].data.to_json
# 	end
# end

# post '/getMLBStandings' do
# 	content_type :json
# 	check_tile = get_tile_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])
# 	if check_tile == []
# 		newInfo = getMLBStandings(request["nhlConference"])
# 		create_tile(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], newInfo)
# 		return newInfo.to_json
# 	else
# 		return check_tile[0].data.to_json
# 	end
# end
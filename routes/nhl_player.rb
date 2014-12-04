# ---------------- NHL ----------------------
# Get information for a player
# post '/getNHLPlayerInfo' do
# 	content_type :json
# 	check_tile = get_tile_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])
# 	if check_tile == []
# 		newInfo = getPlayerInfo(request["p"], request["t"])
# 		create_tile(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], newInfo)
# 		return newInfo.to_json
# 	else
# 		return check_tile[0].data.to_json
# 	end
# end


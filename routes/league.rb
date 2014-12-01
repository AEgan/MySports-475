# ---------------- NFL ----------------------
# Get information for a player
post '/getNFLStandings' do
	# conference = request["conference"]
	# division = request["division"]
	# infoArray = request["infoArray"]
	# content_type :json
	# getNFLStandings(conference, division, infoArray).to_json

	content_type :json
	check_tile = get_tile_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])
	if check_tile == []
		newInfo = getNFLStandings(request["c"], request["d"])
		create_tile(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], newInfo)
		return newInfo.to_json
	else
		return check_tile[0].data.to_json
	end
end

post '/getNHLStandings' do
	# conference = request["conference"]
	# infoArray = request["infoArray"]
	# content_type :json
	# getNHLStandings(conference, infoArray).to_json

	content_type :json
	check_tile = get_tile_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])
	if check_tile == []
		newInfo = getNHLStandings(request["nhlConference"])
		create_tile(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], newInfo)
		return newInfo.to_json
	else
		return check_tile[0].data.to_json
	end
end

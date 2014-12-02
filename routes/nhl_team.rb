
# ---------------- NFL ----------------------
# Get all the team names and ids
get '/nhl_teams' do
  teams = NflTeam.first
  teams.to_json
end

# Get players on the team
post '/getNHLTeamRoster' do
  content_type :json
  getNHLTeamRoster(request["teamName"]).to_json
end

post '/getNHLTeamInfo' do
	content_type :json
	check_custom = get_custom_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])
	if check_custom == []
		check_tile = get_tile_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])

		if check_tile == []
			newInfo = getNHLTeamInfo(request["nhlTeam"])
			create_custom(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], newInfo)
			return newInfo.to_json
		else
			create_custom(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], check_tile[0].data)
			return check_tile[0].data.to_json
		end
	else 
		return check_custom[0].tile.data.to_json
	end
end




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
  getNHLTeamInfo(request["team"]).to_json

  content_type :json
	check_tile = get_tile_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])
	if check_tile == []
		newInfo = getNHLTeamInfo(request["nhlTeam"])
		create_tile(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], newInfo)
		return newInfo.to_json
	else
		return check_tile[0].data.to_json
	end
end



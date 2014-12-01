
# ---------------- NFL ----------------------
# Get all the team names and ids
get '/nfl_teams' do
	teams = NflTeam.first
	teams.to_json
end

# Get players on the team
post '/getTeamRoster' do
	content_type :json
	getTeamRoster(request["teamName"]).to_json
end

post '/getTeamInfo' do
	content_type :json
	check_tile = get_tile_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"])
	if check_tile == []
		print "USED"
		newInfo = getTeamInfo(request["t"])
		create_tile(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], newInfo)
		return newInfo.to_json
	else
		print "DID NOT USE"
		return check_tile[0].data.to_json
	end
	
	

end
 

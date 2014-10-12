
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
	getTeamInfo(request["team"]).to_json
end
 

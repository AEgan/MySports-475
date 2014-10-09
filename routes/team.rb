
# ---------------- NFL ----------------------
# Get all the team names and ids
get '/nfl_team_info' do
	teams = NflTeam.first
	teams.to_json
end

# Get players on the team
post '/getTeamRoster' do
	content_type :json
	getTeamRoster(request["teamName"]).to_json
end


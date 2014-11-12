
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
end

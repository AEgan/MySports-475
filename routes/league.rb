# ---------------- NFL ----------------------
# Get information for a player
get '/getNFLStandings' do
	puts request["player"]
	puts request["team"]
	content_type :json
	getNFLStandings().to_json
end
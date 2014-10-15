# ---------------- NFL ----------------------
# Get information for a player
post '/getPlayerInfo' do
	puts request["player"]
	puts request["team"]
	content_type :json
	getPlayerInfo(request["player"], request["team"]).to_json
end
# ---------------- NFL ----------------------
# Get information for a player
post '/getPlayerInfo' do
	content_type :json
	getPlayerInfo(request["player"], request["team"]).to_json
end
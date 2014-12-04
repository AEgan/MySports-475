post '/create_tile' do
	create_tile(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], request["data"])
	return "i created the tile".to_json
end
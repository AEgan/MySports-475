# ---------------- NBA ----------------------
# Get information for a player
post '/getNBAPlayerInfo' do
  content_type :json
  options_hash = Hash.new
  options_hash[:nbaTeam] = request["nbaTeam"]
  options_hash[:player] = true
  check_custom = get_custom_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], options_hash)
  if check_custom == []
    check_tile = get_tile_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], options_hash)

    if check_tile == []
      newInfo = getNBAPlayerInfo(request["p"], request["nbaTeam"])
      custom = create_custom(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], newInfo, options_hash)
      return custom.tile.to_json
    else
      custom = create_custom(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], check_tile[0].data, options_hash)
      return check_tile[0].to_json
    end
  else
    return check_custom[0].tile.to_json
  end
end

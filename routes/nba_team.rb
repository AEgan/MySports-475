# gets team info for an NBA team
post '/getNBATeamInfo' do
  content_type :json
  check_custom = get_custom_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request['nbaTeam'])
  if check_custom == []
    check_tile = get_tile_if_exists(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request['nbaTeam'])

    if check_tile == []
      newInfo = getNBATeamInfo(request["nbaTeam"])
      custom = create_custom(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], newInfo, request['nbaTeam'])
      return custom.tile.to_json
    else
      custom = create_custom(request["league"], request["category"], request["t"], request["p"], request["c"], request["d"], request["nhlConference"], request["nhlTeam"], request["boxNum"], check_tile[0].data, request['nbaTeam'])
      return check_tile[0].to_json
    end
  else
    return check_custom[0].tile.to_json
  end
end

post '/getNBATeamRoster' do
  content_type :json
  getNBATeamRoster(request["teamName"]).to_json
end

# gets nhl player information
def getNBAPlayerInfo(player_id, team_id)
  SportsDataApi.set_key(:nba, 'tjkbcujdh4hkh2nby8bfs5nf')
  SportsDataApi.set_access_level(:nba, 't')
  player_season_stats = SportsDataApi::Nba.player_season_stats("2014", "REG", team_id)
  players = player_season_stats["players"]
  player = players.find {|play| play["id"].eql?(player_id)}
  player[:team] = Hash.new
  player[:team][:name] = player_season_stats["name"]
  player[:team][:market] = player_season_stats["market"]
  player.to_json
end

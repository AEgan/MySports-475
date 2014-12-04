# gets nhl player information
def getNHLPlayerInfo(player_id, team_name)
  SportsDataApi.set_key(:nhl, 'gk32v4v48gsfy39pqvg2hp82')
  SportsDataApi.set_access_level(:nhl, 't')
  player_season_stats = SportsDataApi::Nhl.player_season_stats(player_id)
  position = player_season_stats.player.primary_position
  player_info = Hash.new
  player_info[:full_name] = player_season_stats.player.full_name
  player_info[:position] = position
  player_info[:jersey_number] = player_season_stats.player.jersey_number
  player_info[:height] = player_season_stats.player.height
  player_info[:weight] = player_season_stats.player.weight
  player_info[:seasons] = player_season_stats.seasons
  player_info
end

# gets stats for a goalie
def goaltending_stats(stats)

end

# gets stats for a skater
def skater_stats(stats)
  skater_stats = Hash.new
  skater_stats[:seasons] = stats.seasons
end

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
  player[:team][:alias] = get_alias(player_season_stats["name"])
  player.to_json
end

def get_alias(team_name)
  {"Wizards"=>"was",
    "Hornets"=>"cha",
    "Hawks"=>"atl",
    "Heat"=>"mia",
    "Magic"=>"orl",
    "Knicks"=>"nyk",
    "76ers"=>"phi",
    "Nets"=>"bkn",
    "Celtics"=>"bos",
    "Raptors"=>"tor",
    "Bulls"=>"chi",
    "Cavaliers"=>"cle",
    "Pacers"=>"ind",
    "Pistons"=>"det",
    "Bucks"=>"mil",
    "Timberwolves"=>"min",
    "Jazz"=>"uta",
    "Thunder"=>"okc",
    "Trail Blazers"=>"por",
    "Nuggets"=>"den",
    "Grizzlies"=>"mem",
    "Rockets"=>"hou",
    "Pelicans"=>"nop",
    "Spurs"=>"sas",
    "Mavericks"=>"dal",
    "Warriors"=>"gsw",
    "Lakers"=>"lal",
    "Clippers"=>"lac",
    "Suns"=>"phx",
    "Kings"=>"sac"}[team_name]
end

require 'sinatra'
require 'rubygems'
# require 'activerecord'
require 'sports_data_api'
require 'json'
# require 'mongo'
# require 'json/ext'
require 'mongoid'
require 'bson'
require 'moped'
# include Mongoid

configure do
  Mongoid.load!("./mongoid.yml", :development)
end

class Page
  include Mongoid::Document
 
  field :title,   type: String
  field :content, type: String
end

get '/' do
  @word = "MySports"
  SportsDataApi.set_key(:nfl, ENV['NFLKEY'])
  SportsDataApi.set_access_level(:nfl, 't')
  @teams = SportsDataApi::Nfl.teams
  @all_teams = @teams.map { |t| t }
  @all_teams_names = @all_teams.map { |t| t.name }
  erb :index
end

get '/test' do
	content_type :json
	

	@word = "MySports"
	# {:key => "key"}.to_json
	SportsDataApi.set_key(:nfl, ENV['NFLKEY'])
  SportsDataApi.set_access_level(:nfl, 't')
  @teams = SportsDataApi::Nfl.teams
  @all_teams = @teams.map { |t| t }
  @all_teams_names = @all_teams.map { |t| t.id }
  { :word => @word, :names => @all_teams_names }.to_json

end

get '/team' do
	content_type :json
	SportsDataApi.set_key(:nfl, 'dsvqbre5qxsqkp5aemgtpgt2')
  SportsDataApi.set_access_level(:nfl, 't')
  # @team = SportsDataApi::Nfl.team_roster('MIA').players.first
  @team_stats = SportsDataApi::Nfl.team_season_stats("BUF", 2013, "REG")
  # @players = @team.map { |p| p.stats }
  {:teamstats => @team_stats.stats}.to_json
end

get '/save' do
	content_type :json
  # $mongo.collection_names.to_json
end

post '/getPlayerInfo' do
	content_type :json
	getPlayerInfo(request["player"], "MIA").to_json
end

post '/getTeamRoster' do
	content_type :json
	getTeamRoster(request["teamName"]).to_json
end

def getTeamRoster(teamName)
	all_players = SportsDataApi::Nfl.team_roster(teamName).players
	return all_players
end

# TODO split this function
def getPlayerInfo(playerName, teamName)
	SportsDataApi.set_key(:nfl, ENV['NFLKEY'])
  SportsDataApi.set_access_level(:nfl, 't')
	all_players = getTeamRoster(teamName)
	basicPlayerInformation = all_players.find {|p| p.player[:name_full] == playerName }.player

	player_season_stats = SportsDataApi::Nfl.player_season_stats(teamName, "2014", "REG")
	playerStats = player_season_stats.players.find{|p| p[:id] == basicPlayerInformation[:id]}[:stats]

	touchdownsHash = playerStats.find {|s| s.touchdowns}.touchdowns
	totalTouchDowns = touchdownsHash.reduce(0) {|total, (key, val)| total += val.to_i}
	basicPlayerInformation = {:touchdowns => totalTouchDowns}.merge(basicPlayerInformation)

	return basicPlayerInformation
end










require 'sinatra'
require 'rubygems'
# require 'activerecord'
require 'sports_data_api'
require 'json'

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
  @all_teams_names = @all_teams.map { |t| t.name }
  { :word => @word, :names => @all_teams_names }.to_json

end
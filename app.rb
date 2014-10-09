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

class NflTeam
  include Mongoid::Document
 
  field :team_info, type: Array
end

get '/' do
  @word = "MySports"
  SportsDataApi.set_key(:nfl, ENV['NFLKEY'])
  SportsDataApi.set_access_level(:nfl, 't')
  # @teams = SportsDataApi::Nfl.teams
  # @all_teams = @teams.map { |t| t }
  # @all_teams_names = @all_teams.map { |t| t.name }
  erb :index
end

require_relative 'routes/init'
require_relative 'helpers/init'




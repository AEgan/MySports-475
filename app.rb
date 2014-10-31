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
  SportsDataApi.set_key(:nfl, 'dsvqbre5qxsqkp5aemgtpgt2')
  SportsDataApi.set_key(:nhl, 'gk32v4v48gsfy39pqvg2hp82')
  SportsDataApi.set_access_level(:nfl, 't')
  SportsDataApi.set_access_level(:nhl, 't')
  erb :index
end

require_relative 'routes/init'
require_relative 'helpers/init'

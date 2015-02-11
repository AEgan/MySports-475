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

# using sessions
enable :sessions

configure do
  Mongoid.load!("./mongoid.yml", :development)
end

class NflTeam
  include Mongoid::Document
  field :team_info, type: Array
end

get '/' do
  @word = "MySports"
  SportsDataApi.set_key(:nfl, 'pzgb7v6v55z9bpzccfb6rttx')
  SportsDataApi.set_key(:nhl, 'hkzpaujvak7qmd5qv2468zpd')
  SportsDataApi.set_access_level(:nfl, 't')
  SportsDataApi.set_access_level(:nhl, 't')
  erb :index
end

require_relative 'routes/init'
require_relative 'helpers/init'
require_relative 'models/init'

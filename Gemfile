# Gemfile

source 'https://rubygems.org'


gem "sinatra"
gem 'sinatra-flash'
gem 'sinatra-redirect-with-flash'
# gem 'sports_data_api' keeping this commented out if something on all_updates breaks
# this is the gem with my changes, with the NHL module and NFL standings / game summary
gem 'sports_data_api', git: "https://github.com/AEgan/sports_data_api.git", branch: "all_updates"
gem 'json'
gem 'mongo'
gem 'bson_ext'
gem "mongoid", "~> 3.0.0"
gem 'moped'

group :development do
 gem 'sqlite3'
 gem "tux"
end

group :production do
 gem 'pg'
end

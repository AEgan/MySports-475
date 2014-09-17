require 'sinatra'

get '/' do
  @word = "Hello, World!"
  erb :index
end

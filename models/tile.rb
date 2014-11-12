class Tile
	include Mongoid::Document
	field :name, :type => String
	field :info
	has_many :customs
end

get '/tile' do

end
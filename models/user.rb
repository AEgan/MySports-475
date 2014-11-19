class User
	include Mongoid::Document
	field :name, :type => String
	field :password, :type => String
	has_many :customs
end

get '/users' do
	@user = User.first
	@customs = @user.customs
	@tiles = @customs.map {|c| Tile.find(c.tile_id)}
	
	
end
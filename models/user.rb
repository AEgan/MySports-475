class User
	include Mongoid::Document
	field :name, :type => String
	field :password, :type => String
	has_many :customs

	# insecure authenticate method for now, will update this later
	# so it actually searches for the hash of the password
	def self.authenticate(name, password)
		User.where(name: name, password: password).entries.first
	end

	# helpful find_by_id method
	def self.find_by_id(id)
		User.where(id: id).entries.first
	end

end

get '/users' do
	@user = User.first
	@customs = @user.customs
	@tiles = @customs.map {|c| Tile.find(c.tile_id)}
	return @tiles.to_json

end

get '/get_tiles' do
	@user = current_user
	@customs = @user.customs
	@tiles = @customs.map {|c| Tile.find(c.tile_id)}
	return @tiles.to_json

end
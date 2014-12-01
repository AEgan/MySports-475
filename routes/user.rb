get '/users' do
	@user = User.first
	@customs = @user.customs
	@tiles = @customs.map {|c| Tile.find(c.tile_id)}
	return @tiles.to_json

end

get '/get_tiles' do
	if logged_in?
		@user = current_user
		@customs = @user.customs
		@tiles = @customs.map {|c| Tile.find(c.tile_id)}
		return @tiles.to_json
	end

end
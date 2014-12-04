post '/signup' do
	if request['password'] != request['password_confirmation']
		# some error message here
	elsif User.where(name: request['name']).entries.length != 0
		# another error message here
	else
		user = User.new
		user.name = request['name']
		user.password = request['password']
		user.save
		session[:user_id] = user._id
	end
	redirect '/'
end

get '/users' do
	@user = User.first
	@customs = @user.customs
	@tiles = @customs.map {|c| Tile.find(c.tile_id)}
	return @tiles.to_json

end

get '/get_tiles' do
	if logged_in?
		@user = current_user
		@customs = @user.customs.sort_by{|c| c.boxNum}
		@tiles = @customs.map {|c| c.tile}
		return @tiles.to_json
	end

end

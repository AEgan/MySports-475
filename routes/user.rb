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

get '/get_tiles' do
	if logged_in?
		@user = current_user
		@customs = @user.customs.sort_by{|c| c.boxNum.to_i}
		@tiles = @customs.map {|c| c.tile}
		return @tiles.to_json
	end
end

post '/save_order' do
	@new_order = request["new_order"]
	count = 1
	@new_order.each do |k,v|
		custom = get_custom_if_exists(v["league"], v["category"], v["t"], v["p"], v["c"], v["d"], v["nhlConference"], v["nhlTeam"])
		the_custom = custom[0]
		the_custom.boxNum = count
		the_custom.save
		count += 1
	end
	return "save_order".to_json
end

post '/delete_custom' do
	puts "DELETE CUSTOM"
	v = request["tile"]
	puts v
	@custom_to_delete = get_custom_if_exists(v["league"], v["category"], v["t"], v["p"], v["c"], v["d"], v["nhlConference"], v["nhlTeam"])
	@custom_to_delete = @custom_to_delete[0]
	@custom_to_delete.delete
	return "delete_custom".to_json
end

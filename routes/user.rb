get '/user_tiles' do

end

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

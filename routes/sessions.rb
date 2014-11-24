require 'mongo'

# logs a user in
post '/login' do
  user = User.authenticate(request["name"], request["password"])
  @responseHash = Hash.new
  if(user)
    session[:user_id] = user._id
    @responseHash[:success] = true
    @responseHash[:message] = "Welcome back, #{user.name}!"
  else
    @responseHash[:success] = false
    @responseHash[:message] = "Incorrect Username or Password"
  end
  redirect '/'
end

# logs a user out
get '/logout' do
  @responseHash = Hash.new
  if(session[:user_id])
    @responseHash[:message] = "Successfully logged out"
    session[:user_id] = nil
  else
    @responseHash[:message] = "You were never logged in..."
  end
  redirect '/'
end

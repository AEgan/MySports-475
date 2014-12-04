# creates helper methods for views
helpers do

  # checks if there is a logged in user
  def logged_in?
    !session[:user_id].nil?
  end

  # returns the current user that is logged in, or nil if nobody is logged in
  def current_user
    logged_in? ? User.find_by_id(session[:user_id]) : nil
  end
end

class User
	include Mongoid::Document
	field :name, :type => String
	field :password, :type => String
	has_many :customs
end

get '/users' do
	@users = Users.all
end
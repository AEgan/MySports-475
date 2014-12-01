require 'bcrypt'

class User
	include Mongoid::Document
	include BCrypt
	field :name, :type => String
	field :password_hash, :type => String
	has_many :customs

	# insecure authenticate method for now, will update this later
	# so it actually searches for the hash of the password
	def self.authenticate(auth_name, auth_password)
		user = User.where(name: auth_name).entries.first
		if user && BCrypt::Password.new(user.password_hash) == auth_password
			user
		else
			nil
		end
	end

	# helpful find_by_id method
	def self.find_by_id(id)
		User.where(id: id).entries.first
	end

	def password
		@password ||= Password.new(password_hash)
	end

	def password=(new_password)
		@password = Password.create(new_password)
		self.password_hash = @password
	end

end

get '/users' do
	@user = User.first
	@customs = @user.customs
	@tiles = @customs.map {|c| Tile.find(c.tile_id)}
	return @tiles.to_json

end

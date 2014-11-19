class Tile
	include Mongoid::Document
	field :name, :type => String
	field :info
	has_many :customs
	field :league
	field :category
	field :t
	field :p
	field :c
	field :d
	field :nhlConference
	field :nhlTeam
end

post '/create_tile' do
	@user = User.first
	@new_tile = Tile.new
	@new_custom = Custom.new
	
	@new_tile.league = request["league"]
	@new_tile.category = request["category"]
	@new_tile.t = request["t"]
	@new_tile.p = request["p"]
	@new_tile.c = request["c"]
	@new_tile.d = request["d"]
	@new_tile.nhlConference = request["nhlConference"]
	@new_tile.nhlTeam = request["nhlTeam"]

	@new_tile.save

	@new_custom.user = @user
	@new_custom.tile = @new_tile
	@new_custom.save

	return "i created the tile".to_json


end
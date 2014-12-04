class Tile
	include Mongoid::Document
	field :name, :type => String
	field :data
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

def get_custom_if_exists(league, category, t, p, c, d, nhlConference, nhlTeam)
	tile = Tile.where({league: league, category: category, t: t, p: p, c: c, d: d, nhlConference: nhlConference, nhlTeam: nhlTeam})[0]
	user = current_user
	custom = Custom.where({tile: tile, user: user}).entries
	return custom
end

def get_tile_if_exists(league, category, t, p, c, d, nhlConference, nhlTeam)
	return Tile.where({league: league, category: category, t: t, p: p, c: c, d: d, nhlConference: nhlConference, nhlTeam: nhlTeam}).entries
end

def create_custom(league, category, t, p, c, d, nhlConference, nhlTeam, boxNum, data)
	custom = get_custom_if_exists(league, category, t, p, c, d, nhlConference, nhlTeam)
	if custom == []
		tile = create_tile(league, category, t, p, c, d, nhlConference, nhlTeam, boxNum, data)
		@new_custom = Custom.new
		@new_custom.user = current_user
		@new_custom.tile = tile
		@new_custom.boxNum = boxNum
		@new_custom.save
		return @new_custom
	else
		return custom[0]
	end
end

def create_tile(league, category, t, p, c, d, nhlConference, nhlTeam, boxNum, data)
	check_tile = get_tile_if_exists(league, category, t, p, c, d, nhlConference, nhlTeam)
	if check_tile == []
		@new_tile = Tile.new
		
		@new_tile.league = league
		@new_tile.category = category
		@new_tile.t = t
		@new_tile.p = p
		@new_tile.c = c
		@new_tile.d = d
		@new_tile.nhlConference = nhlConference
		@new_tile.nhlTeam = nhlTeam
		@new_tile.data = data
		
		@new_tile.save
		return @new_tile
	else 
		return check_tile[0]
	end
	
end

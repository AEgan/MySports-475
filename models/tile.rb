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
	field :nbaTeam
	field :nbaDivision
end

def get_custom_if_exists(league, category, t, p, c, d, nhlConference, nhlTeam, options={})
	if(league.downcase.eql?('nba'))
		if(options[:player].nil?)
			if(options[:division].nil?)
				tile = Tile.where({league: league, category: category, nbaTeam: options[:nbaTeam]})[0]
			else
				tile = Tile.where({league: league, category: category, nbaDivision: options[:division]})[0]
			end
		else
			tile = Tile.where({league: league, category: category, nbaTeam: options[:nbaTeam], p: p})[0]
		end
	else
		tile = Tile.where({league: league, category: category, t: t, p: p, c: c, d: d, nhlConference: nhlConference, nhlTeam: nhlTeam})[0]
	end
	user = current_user
	custom = Custom.where({tile: tile, user: user}).entries
	return custom
end

def get_tile_if_exists(league, category, t, p, c, d, nhlConference, nhlTeam, options = {})
	if(league.downcase.eql?('nba'))
		if(options[:player].nil?)
			if(options[:division].nil?)
				return Tile.where({league: league, category: category, nbaTeam: options[:nbaTeam]}).entries
			else
				return Tile.where({league: league, category: category, nbaDivision: options[:division]})
			end
		else
			return Tile.where({league: league, category: category, nbaTeam: options[:nbaTeam], p: p}).entries
		end
	else
		return Tile.where({league: league, category: category, t: t, p: p, c: c, d: d, nhlConference: nhlConference, nhlTeam: nhlTeam}).entries
	end
end

def create_custom(league, category, t, p, c, d, nhlConference, nhlTeam, boxNum, data, options={})
	custom = get_custom_if_exists(league, category, t, p, c, d, nhlConference, nhlTeam, options)
	if custom == []
		tile = create_tile(league, category, t, p, c, d, nhlConference, nhlTeam, boxNum, data, options)
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

def create_tile(league, category, t, p, c, d, nhlConference, nhlTeam, boxNum, data, options={})
	check_tile = get_tile_if_exists(league, category, t, p, c, d, nhlConference, nhlTeam, options)
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
		@new_tile.nbaTeam = options[:nbaTeam]
		@new_tile.nbaDivision = options[:division]

		@new_tile.save
		return @new_tile
	else
		return check_tile[0]
	end

end

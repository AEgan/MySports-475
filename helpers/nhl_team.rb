# ---------------- NHL ----------------------
def getNHLTeamInfo(teamID)
	SportsDataApi.set_key(:nhl, 'gk32v4v48gsfy39pqvg2hp82')
	SportsDataApi.set_access_level(:nhl, 't')
	teams = SportsDataApi::Nhl.teams()
	team = teams.select {|t| t.id.eql? teamID }.first
	return_hash = Hash.new
	return_hash[:name] = team.name
	return_hash[:alias] = team.alias
	return_hash[:market] = team.market
	return_hash[:conference] = team.conference.capitalize
	return_hash[:division] = team.division.capitalize
	return_hash[:id] = team.id
	venue_hash = Hash.new
	venue_hash[:name] = team.venue.name
	venue_hash[:capacity] = team.venue.capacity
	venue_hash[:city] = team.venue.city
	venue_hash[:state] = team.venue.state
	return_hash[:venue] = venue_hash
	return_hash
end

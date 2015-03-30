# gets the standings for NHL
def getNFLStandings(conference, division)
	SportsDataApi.set_key(:nfl, 'pzgb7v6v55z9bpzccfb6rttx')
	SportsDataApi.set_access_level(:nfl, 't')

	standings = SportsDataApi::Nfl.standings('2014', 'REG')
	group = standings[conference][:divisions][division]
	return group
end

# gets the standings for NHL
def getNHLStandings(conference)
	SportsDataApi.set_key(:nhl, 'gk32v4v48gsfy39pqvg2hp82')
	SportsDataApi.set_access_level(:nhl, 't')
	standings = SportsDataApi::Nhl.standings('2014', 'REG')
	if(conference.eql?("ATLANTIC") || conference.eql?("METROPOLITAN"))
		group = standings.east[:divisions][conference]
	else
		group = standings.west[:divisions][conference]
	end
	return group
end

# gets the NBA standings
def getNBAStandings(division)
	SportsDataApi.set_key(:nba, 'tjkbcujdh4hkh2nby8bfs5nf')
	SportsDataApi.set_access_level(:nba, 't')
	standings = SportsDataApi::Nba.standings('2014', 'REG')
	if(division.eql?('atlantic') || division.eql?('central') || division.eql?('southeast'))
		group = standings.eastern[:divisions][division.to_sym]
	else
		group = standings.western[:divisions][division.to_sym]
	end
	return group
end

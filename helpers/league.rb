# gets the standings for NHL
def getNFLStandings(conference, division)
	SportsDataApi.set_key(:nfl, 'dsvqbre5qxsqkp5aemgtpgt2')
	SportsDataApi.set_access_level(:nfl, 't')

	standings = SportsDataApi::Nfl.standings('2014', 'REG')
	group = standings[conference][:divisions][division]
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
	group
end

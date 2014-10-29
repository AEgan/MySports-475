def getNFLStandings(conference, division)
	SportsDataApi.set_key(:nfl, 'dsvqbre5qxsqkp5aemgtpgt2')
	SportsDataApi.set_access_level(:nfl, 't')

	standings = SportsDataApi::Nfl.standings('2014', 'REG')
	group = standings[conference][division]
end

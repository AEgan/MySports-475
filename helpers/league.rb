def getNFLStandings()
	SportsDataApi.set_key(:nfl, 'dsvqbre5qxsqkp5aemgtpgt2')
	SportsDataApi.set_access_level(:nfl, 't')

	standings = SportsDataApi::Nfl.standings('2014', 'REG')

	input_1 = "NFC"
	input_2 = "EAST"

	# group = standings[input_1][:divisions][input_2]
	nfc_east = standings.nfc[:divisions][0]
end
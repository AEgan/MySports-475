class Roster
  include Mongoid::Document
  field :league, type: String
  field :team_id, :type => String
  field :players, type: Array

  def self.get_roster(league, team_id)
    league = league.downcase
    team_id = team_id.downcase
    puts league
    puts team_id
    results = Roster.where(league: league, team_id: team_id).all.entries
    if results.empty?
      if(league.eql?("nhl"))

        team_roster = SportsDataApi::Nhl.team_roster(team_id)
        players_array = team_roster.map{|player| {id: player.id, full_name: player.full_name, first_name: player.first_name, last_name: player.last_name, name_full: player.full_name}}
        players_array.sort_by! {|play| play[:last_name] }
        roster = Roster.new()
        roster.league = league
        roster.team_id = team_id
        roster.players = players_array
        roster.save
        roster.players


      elsif(league.eql?("nfl"))

        players = SportsDataApi::Nfl.team_roster(team_id).players.map(&:player).compact
        players.sort_by! {|play| play[:last_name] }
        roster = Roster.new()
        roster.league = league
        roster.team_id = team_id
        roster.players = players
        roster.save
        return roster.players

      elsif(league.eql?("nba"))

        players = SportsDataApi::Nba.team_roster(team_id).players.map(&:player).compact
        players.sort_by! {|play| play[:last_name] }
        roster = Roster.new()
        roster.league = league
        roster.team_id = team_id
        roster.players = players
        roster.save
        return roster.players

      else
      end
    else
      results.first.players
    end
  end

  private

  # saves the roster from the API call
  def save_nhl_roster(league, team_id)
    team_roster = SportsDataApi::Nhl.team_roster(team_id)
    players_array = team_roster.map{|player| {id: player.id, full_name: player.full_name}}
    roster = Roster.new()
    roster.league = league
    roster.team_id = team_id
    roster.players = players_array
    roster.save
    roster.players
  end
  # saves the nfl roster
  def save_nfl_roster(league, team_id)
    players = SportsDataApi::Nfl.team_roster(team_id).players.map(&:player).compact!
    players_array = players.map {|play| {id: play[:id], full_name: play[:name_full]}}
    roster = Roster.new()
    roster.league = league
    roster.team_id = team_id
    roster.players = players_array
    roster.save
    roster.players
  end
end

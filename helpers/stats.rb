def getTouchdowns(playerStats)
	touchdowns = playerStats.select {|a| !a.touchdowns.nil?}.first
	if !touchdowns.nil?
		touchdowns = touchdowns.touchdowns
		totalTouchDowns = touchdowns.reduce(0) {|total, (key, val)| total += val.to_i}
		touchdowns = {:touchdowns => {:total => totalTouchDowns}.merge(touchdowns)}
	else
		touchdowns = {:touchdowns => {:pass=>"0", :rush=>"0", :int=>"0", :fum_ret=>"0", :punt_ret=>"0", :kick_ret=>"0", :fg_ret=>"0", :other=>"0"}}
	end

	return touchdowns
end

def getReceiving(playerStats)
	receiving = playerStats.select {|a| !a.receiving.nil?}.first
	if !receiving.nil?
		receiving = {:receiving => receiving.receiving}
	else
		receiving = {:receiving => {:tar=>"0", :rec=>"0", :yds=>"0", :yac=>"0", :fd=>"0", :avg=>"0", :td=>"0", :lg=>"0", :rz_tar=>"0", :fum=>"0", :yds_10_pls=>"0", :yds_20_pls=>"0", :yds_30_pls=>"0", :yds_40_pls=>"0", :yds_50_pls=>"0"}}
	end

	return receiving
end

def getPenalty(playerStats)
	penalty = playerStats.select {|a| !a.penalty.nil?}.first
	if !penalty.nil?
		penalty = {:penalty => penalty.penalty}
	else
		penalty = {:penalty => {:num=>"0", :yds=>"0", :fd=>"0"}}
	end

	return penalty
end

def getPuntReturn(playerStats)
	punt_return = playerStats.select {|a| !a.punt_return.nil?}.first
	if !punt_return.nil?
		punt_return = {:punt_return => punt_return.punt_return}
	else
		punt_return = {:punt_return => {:returns =>"0", :yds =>"0", :fc =>"0", :lg =>"0", :td =>"0", :avg =>"0", :yds_10_pls =>"0", :yds_20_pls =>"0", :yds_30_pls =>"0", :yds_40_pls =>"0", :yds_50_pls =>"0"}}
	end

	return punt_return
end

def getKickReturn(playerStats)
	kick_return = playerStats.select {|a| !a.kick_return.nil?}.first
	if !kick_return.nil?
		kick_return = {:kick_return => kick_return.kick_return}
	else
		kick_return = {:kick_return => {:returns =>"0", :yds =>"0", :fc =>"0", :lg =>"0", :td =>"0", :avg =>"0", :yds_10_pls =>"0", :yds_20_pls =>"0", :yds_30_pls =>"0", :yds_40_pls =>"0", :yds_50_pls =>"0"}}
	end

	return kick_return
end

def getFieldGoal(playerStats)
	field_goal = playerStats.select {|a| !a.field_goal.nil?}.first
	if !field_goal.nil?
		field_goal = {:field_goal => field_goal.field_goal}
	else
		field_goal = {:field_goal => {:att =>"0", :made =>"0", :pct =>"0", :lg =>"0", :att_19 =>"0", :made_19 =>"0", :att_29 =>"0", :made_29 =>"0", :att_39 =>"0", :made_39 =>"0", :att_49 =>"0", :made_49 =>"0", :att_50 =>"0", :made_50 =>"0"}}
	end

	return field_goal
end

def getKickOffs(playerStats)
	kickoffs = playerStats.select {|a| !a.kickoffs.nil?}.first
	if !kickoffs.nil?
		kickoffs = {:kickoffs => kickoffs.kickoffs}
	else
		kickoffs = {:kickoffs => {:kicks =>"0", :yds =>"0", :net_yds =>"0", :lg =>"0", :endzone =>"0", :in20 =>"0", :tb =>"0", :ret =>"0", :avg =>"0", :net_avg =>"0", :ret_yds =>"0", :avg_ret =>"0", :in20_pct =>"0", :tb_pct =>"0"}}
	end

	return kickoffs
end

def getExtraPoint(playerStats)
	extra_point = playerStats.select {|a| !a.extra_point.nil?}.first
	if !extra_point.nil?
		extra_point = {:extra_point => extra_point.extra_point}
	else
		extra_point = {:extra_point => {:kicks =>"0", :yds =>"0", :net_yds =>"0", :lg =>"0", :endzone =>"0", :in20 =>"0", :tb =>"0", :ret =>"0", :avg =>"0", :net_avg =>"0", :ret_yds =>"0", :avg_ret =>"0", :in20_pct =>"0", :tb_pct =>"0"}}
	end

	return extra_point
end

def getRushing(playerStats)
	rushing = playerStats.select {|a| !a.rushing.nil?}.first
	if !rushing.nil?
		rushing = {:rushing => rushing.rushing}
	else
		rushing = {:rushing => {:att =>"0", :yds =>"0", :avg =>"0", :lg =>"0", :td =>"0", :fd =>"0", :fd_pct =>"0", :sfty =>"0", :rz_att =>"0", :fum =>"0"}}
	end

	return rushing
end

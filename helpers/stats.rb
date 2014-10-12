def getTouchdowns(originalStats)
	touchdowns = originalStats.select {|a| !a.touchdowns.nil?}.first
	if !touchdowns.nil?
		touchdowns = touchdowns.touchdowns
		totalTouchDowns = touchdowns.reduce(0) {|total, (key, val)| total += val.to_i}
		touchdowns = {:touchdowns => {:total => totalTouchDowns}.merge(touchdowns)}
	else
		touchdowns = {:touchdowns => {:pass=>"0", :rush=>"0", :int=>"0", :fum_ret=>"0", :punt_ret=>"0", :kick_ret=>"0", :fg_ret=>"0", :other=>"0"}}
	end

	return touchdowns
end

def getReceiving(originalStats)
	receiving = originalStats.select {|a| !a.receiving.nil?}.first
	if !receiving.nil?
		receiving = {:receiving => receiving.receiving}
	else
		receiving = {:receiving => {:tar=>"0", :rec=>"0", :yds=>"0", :yac=>"0", :fd=>"0", :avg=>"0", :td=>"0", :lg=>"0", :rz_tar=>"0", :fum=>"0", :yds_10_pls=>"0", :yds_20_pls=>"0", :yds_30_pls=>"0", :yds_40_pls=>"0", :yds_50_pls=>"0"}}
	end

	return receiving
end

def getPenalty(originalStats)
	penalty = originalStats.select {|a| !a.penalty.nil?}.first
	if !penalty.nil?
		penalty = {:penalty => penalty.penalty}
	else
		penalty = {:penalty => {:num=>"0", :yds=>"0", :fd=>"0"}}
	end

	return penalty
end

def getPuntReturn(originalStats)
	punt_return = originalStats.select {|a| !a.punt_return.nil?}.first
	if !punt_return.nil?
		punt_return = {:punt_return => punt_return.punt_return}
	else
		punt_return = {:punt_return => {:returns =>"0", :yds =>"0", :fc =>"0", :lg =>"0", :td =>"0", :avg =>"0", :yds_10_pls =>"0", :yds_20_pls =>"0", :yds_30_pls =>"0", :yds_40_pls =>"0", :yds_50_pls =>"0"}}
	end

	return punt_return
end

def getKickReturn(originalStats)
	kick_return = originalStats.select {|a| !a.kick_return.nil?}.first
	if !kick_return.nil?
		kick_return = {:kick_return => kick_return.kick_return}
	else
		kick_return = {:kick_return => {:returns =>"0", :yds =>"0", :fc =>"0", :lg =>"0", :td =>"0", :avg =>"0", :yds_10_pls =>"0", :yds_20_pls =>"0", :yds_30_pls =>"0", :yds_40_pls =>"0", :yds_50_pls =>"0"}}
	end

	return kick_return
end

def getFieldGoal(originalStats)
	field_goal = originalStats.select {|a| !a.field_goal.nil?}.first
	if !field_goal.nil?
		field_goal = {:field_goal => field_goal.field_goal}
	else
		field_goal = {:field_goal => {:att =>"0", :made =>"0", :pct =>"0", :lg =>"0", :att_19 =>"0", :made_19 =>"0", :att_29 =>"0", :made_29 =>"0", :att_39 =>"0", :made_39 =>"0", :att_49 =>"0", :made_49 =>"0", :att_50 =>"0", :made_50 =>"0"}}
	end

	return field_goal
end

def getKickOffs(originalStats)
	kickoffs = originalStats.select {|a| !a.kickoffs.nil?}.first
	if !kickoffs.nil?
		kickoffs = {:kickoffs => kickoffs.kickoffs}
	else
		kickoffs = {:kickoffs => {:kicks =>"0", :yds =>"0", :net_yds =>"0", :lg =>"0", :endzone =>"0", :in20 =>"0", :tb =>"0", :ret =>"0", :avg =>"0", :net_avg =>"0", :ret_yds =>"0", :avg_ret =>"0", :in20_pct =>"0", :tb_pct =>"0"}}
	end

	return kickoffs
end

def getExtraPoint(originalStats)
	extra_point = originalStats.select {|a| !a.extra_point.nil?}.first
	if !extra_point.nil?
		extra_point = {:extra_point => extra_point.extra_point}
	else
		extra_point = {:extra_point => {:kicks =>"0", :yds =>"0", :net_yds =>"0", :lg =>"0", :endzone =>"0", :in20 =>"0", :tb =>"0", :ret =>"0", :avg =>"0", :net_avg =>"0", :ret_yds =>"0", :avg_ret =>"0", :in20_pct =>"0", :tb_pct =>"0"}}
	end

	return extra_point
end

def getRushing(originalStats)
	rushing = originalStats.select {|a| !a.rushing.nil?}.first
	if !rushing.nil?
		rushing = {:rushing => rushing.rushing}
	else
		rushing = {:rushing => {:att =>"0", :yds =>"0", :avg =>"0", :lg =>"0", :td =>"0", :fd =>"0", :fd_pct =>"0", :sfty =>"0", :rz_att =>"0", :fum =>"0"}}
	end

	return rushing
end

def getFirstDowns(originalStats)
	first_downs = originalStats.select {|a| !a.first_downs.nil?}.first
	if !first_downs.nil?
		first_downs = {:first_downs => first_downs.first_downs}
	else
		first_downs = {:first_downs => {:num =>"0", :pass =>"0", :rush =>"0"}}
	end

	return first_downs
end

def getPassing(originalStats)
	passing = originalStats.select {|a| !a.passing.nil?}.first
	if !passing.nil?
		passing = {:passing => passing.passing}
	else
		passing = {:passing => {:att =>"0", :cmp =>"0", :yds =>"0", :lg =>"0", :sk =>"0", :sk_yds =>"0", :td =>"0", :int =>"0", :int_td =>"0", :fd =>"0", :sfty =>"0", :rz_att =>"0", :rating =>"0", :avg =>"0", :cmp_pct =>"0", :cmp_avg =>"0", :td_pct =>"0", :int_pct =>"0", :yds_10_pls =>"0", :yds_20_pls =>"0", :yds_30_pls =>"0", :yds_40_pls =>"0", :yds_50_pls =>"0"}}
	end

	return passing
end

def getFumbles(originalStats)
	fumbles = originalStats.select {|a| !a.fumbles.nil?}.first
	if !fumbles.nil?
		fumbles = {:fumbles => fumbles.fumbles}
	else
		fumbles = {:fumbles => {:fum =>"0", :lost =>"0", :oob =>"0", :own_rec =>"0", :opp_rec =>"0"}}
	end

	return fumbles
end

def getPunting(originalStats)
	punting = originalStats.select {|a| !a.punting.nil?}.first
	if !punting.nil?
		punting = {:punting => punting.punting}
	else
		punting = {:punting => {:punts =>"0", :yds =>"0", :net_yds =>"0", :lg =>"0", :blk =>"0", :in20 =>"0", :tb =>"0", :ret =>"0", :avg =>"0", :net_avg =>"0", :ret_yds =>"0", :avg_ret =>"0", :in20_pct =>"0", :tb_pct =>"0"}}
	end

	return punting
end

def getThirdDownEfficiency(originalStats)
	third_down_efficiency = originalStats.select {|a| !a.third_down_efficiency.nil?}.first
	if !third_down_efficiency.nil?
		third_down_efficiency = {:third_down_efficiency => third_down_efficiency.third_down_efficiency}
	else
		third_down_efficiency = {:third_down_efficiency => {:att=>"0", :conv=>"0", :pct=>"0", :pass=>"0", :rush=>"0", :pen=>"0"}}
	end

	return third_down_efficiency
end

def getFourthDownEfficiency(originalStats)
	fourth_down_efficiency = originalStats.select {|a| !a.fourth_down_efficiency.nil?}.first
	if !fourth_down_efficiency.nil?
		fourth_down_efficiency = {:fourth_down_efficiency => fourth_down_efficiency.fourth_down_efficiency}
	else
		fourth_down_efficiency = {:fourth_down_efficiency => {:att=>"0", :conv=>"0", :pct=>"0", :pass=>"0", :rush=>"0", :pen=>"0"}}
	end

	return fourth_down_efficiency
end

def getRedzoneEfficiency(originalStats)
	redzone_efficiency = originalStats.select {|a| !a.redzone_efficiency.nil?}.first
	if !redzone_efficiency.nil?
		redzone_efficiency = {:redzone_efficiency => redzone_efficiency.redzone_efficiency}
	else
		redzone_efficiency = {:redzone_efficiency => {:att=>"0", :td=>"0", :pct=>"0"}}
	end

	return redzone_efficiency
end

def getGoalEfficiency(originalStats)
	goal_efficiency = originalStats.select {|a| !a.goal_efficiency.nil?}.first
	if !goal_efficiency.nil?
		goal_efficiency = {:goal_efficiency => goal_efficiency.goal_efficiency}
	else
		goal_efficiency = {:goal_efficiency => {:att=>"0", :td=>"0", :pct=>"0"}}
	end

	return goal_efficiency
end

def getTwoPointConversion(originalStats)
	two_point_conversion = originalStats.select {|a| !a.two_point_conversion.nil?}.first
	if !two_point_conversion.nil?
		two_point_conversion = {:two_point_conversion => two_point_conversion.two_point_conversion}
	else
		two_point_conversion = {:two_point_conversion => {:att =>"0", :pass =>"0", :rush =>"0", :rec =>"0", :failed =>"0"}}
	end

	return two_point_conversion
end

def getDefense(originalStats)
	defense = originalStats.select {|a| !a.defense.nil?}.first
	if !defense.nil?
		defense = {:defense => defense.defense}
	else
		defense = {:defense => {:tackle =>"0", :ast =>"0", :comb =>"0", :tlost =>"0", :sack =>"0", :sack_yds =>"0", :sfty =>"0", :int =>"0", :int_yds =>"0", :int_lg =>"0", :int_td =>"0", :force_fum =>"0", :fum_rec =>"0", :fum_td =>"0", :qh =>"0", :pd =>"0", :bk =>"0", :sp_tackle =>"0", :sp_ast =>"0", :sp_comb =>"0", :sp_force_fum =>"0", :sp_fum_rec =>"0", :misc_tackle =>"0", :misc_ast =>"0", :misc_comb =>"0", :misc_force_fum =>"0", :misc_fum_rec =>"0"}}
	end

	return defense
end



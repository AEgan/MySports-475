class Custom
	include Mongoid::Document
	belongs_to :user
	belongs_to :tile
end
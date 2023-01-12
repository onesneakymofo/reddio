# == Schema Information
#
# Table name: subreddits
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Subreddit < ApplicationRecord
  has_many :listings
end

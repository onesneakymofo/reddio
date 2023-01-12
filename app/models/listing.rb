# == Schema Information
#
# Table name: listings
#
#  id          :bigint           not null, primary key
#  added_at    :datetime         not null
#  description :string
#  score       :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  reddit_id   :string           not null
#
class Listing < ApplicationRecord
  belongs_to :subreddit
  has_one :video_detail

  scope :with_subreddit, ->(name) { joins(:subreddits).where('subreddits.name = ?', name) }
  scope :with_occurrence, ->(occurrence) { where(added_at: (determine_date_gap(occurrence)..Time.current)) }

  def determine_date_gap(occurrence)
    case occurrence
      when 'hour'
        1.hour.ago
      when 'day'
        24.hours.ago
      when 'week'
        1.week.ago
      when 'month'
        1.months.ago
      when 'year'
        1.years.ago
    end
  end
end

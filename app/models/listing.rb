class Listing < ApplicationRecord

  belongs_to :subreddit
  has_one :listing_detail

  scope :with_subreddit, ->(name) { joins(:subreddits).where('subreddits.name = ?', name,) }
  scope :with_occurrence, ->(occurrence) { where(added_at: Time.current..determine_date_gap(occurrence))}

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
end
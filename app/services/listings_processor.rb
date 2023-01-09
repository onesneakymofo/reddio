class ListingHydrater

  def self.call
    new.execute
  end

  def execute
    process
  end

  private

  def process
    Subreddit.all.find_each do |subreddit|
      listings = RedditApi.call(subreddit: subreddit.name, occurrence: 'hour')
      listings.each do |listing|
        ListingHydrater.call(listing)
      end
    end
  end

  def find_datetime
    Time.at(listing[:created_at]).to_datetime.utc.iso8601
  end
end
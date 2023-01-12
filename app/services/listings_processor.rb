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
        created_listing = ListingCreator.call(listing)
        VideoDetailCreator.call(created_listing)
      end
    end
  end
end
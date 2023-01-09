class RedditApi
  attr_reader :subreddit, :occurrence, :data

  def initialize(subreddit:, occurrence:)
    @subreddit = subreddit
    @occurrence = occurrence
    @data = []
  end

  def execute
    find_listings
  end

  private

  def find_listings(after = nil)
    response = HTTParty.get("https://www.reddit.com/r/#{subreddit}/top.json?t=#{occurrence}&after=#{after}")
    if response.ok? && response.dig("data").present?
      data << response["data"]
      find_listings(response.dig('data', 'after')) if response.dig('data', 'after').present?
    end
  end
end
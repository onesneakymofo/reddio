class ListingCreator
  def self.call(listing)
    new(listing).execute
  end

  def initialize(listing)
    @listing = listing

  end

  def execute
    listng = create_listing
  end

  private

  def create_listing
    Listing.create(description: listing[:description], external_id: listing[:id], score: listing[:score], added_at: find_datetime)
  end

  def find_datetime
    Time.at(listing[:created_at]).to_datetime.utc.iso8601
  end
end
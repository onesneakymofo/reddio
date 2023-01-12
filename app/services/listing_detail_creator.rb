class VideoDetailCreator
  def self.call(listing)
    new(listing).execute
  end

  def initialize(listing)
    @listing = listing

  end

  def execute
    create
  end

  private

  def create
    listing.video_detail.create(title: video_details[:title], video_id: video_details[:video_id], duration: video_details[:duration], owner: video_details[:owner])
  end

  def find_datetime
    Time.at(listing[:created_at]).to_datetime.utc.iso8601
  end

  def video_details
    binding.break

    Youtube(YoutubeApi.new(listing).execute)
  end
end
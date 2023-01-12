class YoutubeApi
  attr_reader :video_id

  def initialize(video_id)
    @video_id = video_id
  end

  def execute
    find_video_details
  end

  private

  # recursively call Reddit's API until we have no more pagination left
  def find_video_details
    video_response = HTTParty.get('https://youtube.googleapis.com/youtube/v3/videos', query: {part: 'snippet,contentDetails', id: video_id, key: ENV.fetch('YOUTUBE_V3_API_KEY')})
    if (video_response.ok?)
      channel_respone = HTTParty.get('https://youtube.googleapis.com/youtube/v3/channels', query: {part: 'snippet', id: video_response.dig('items', 0, 'snippet', 'channelId'), key: ENV.fetch('YOUTUBE_V3_API_KEY')})
      {
        title: video_response.dig('items', 0, 'snippet', 'title'),
        duration: find_duration(video_response.dig('items', 0, 'contentDetails', 'duration')),
        owner: channel_respone.dig('items', 0, 'snippet', 'title'),
        id: video_id
      }
    end
  end

  def part_params
    ['snippet', 'contentDtails' ,'statistics']
  end

  def find_duration(iso8601_time)
    time = Time.strptime('PT21M3S', 'PT%MM%S')
    formatted_time = time.strftime('%M:%S')
  end
end

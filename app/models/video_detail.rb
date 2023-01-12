# == Schema Information
#
# Table name: video_details
#
#  id         :bigint           not null, primary key
#  duration   :text             not null
#  owner      :text             not null
#  title      :text             not null
#  url        :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  listing_id :bigint
#  video_id   :string           not null
#
# Indexes
#
#  index_video_details_on_listing_id  (listing_id)
#
# Foreign Keys
#
#  fk_rails_...  (listing_id => listings.id)
#
class VideoDetail < ApplicationRecord
  belongs_to :listing
end

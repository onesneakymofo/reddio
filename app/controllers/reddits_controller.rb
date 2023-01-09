class RedditsController < ApplicationController
  def show
    respond_to do |format|
      listings = Listing.joins(:subreddits)
      .with_name(reddit_params[:subreddit])
      .with_occurrence(reddit_params[:occurrence])
      format.json {render json: {data: listings}, status: :ok }
    end
  end

  def reddit_params
    params.permit(:subreddit, :occurrence)
  end
end
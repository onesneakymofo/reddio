class RedditsController < ApplicationController
  def show
    respond_to do |format|
      response = HTTParty.get("https://www.reddit.com/r/#{reddit_params[:subreddit]}/top.json?t=#{reddit_params[:occurrence]}")
      format.json {render json: {data: response['data']}, status: :ok }
    end
  end

  def reddit_params
    params.permit(:subreddit, :occurrence)
  end
end
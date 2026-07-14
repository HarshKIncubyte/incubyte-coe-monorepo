class SearchController < ApplicationController
  def search
    query = params[:q]

    if query.blank?
      render json: { error: "Please provide a search query" }, status: :bad_request
      return
    end

    results = Post.search(query).records.to_a

    render json: {
      query: query,
      total: results.count,
      results: results.map { |post|
        {
          id: post.id,
          title: post.title,
          published: post.published,
          user_id: post.user_id
        }
      }
    }
  end
end


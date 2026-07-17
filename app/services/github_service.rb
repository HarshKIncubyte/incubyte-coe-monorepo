require "net/http"
require "json"

class GithubService
  BASE_URL = "https://api.github.com"

  # SMELL: No status check or timeout — a 404 parses as valid data, slow API hangs forever.
  def fetch_user(username)
    uri = URI("#{BASE_URL}/users/#{username}")

    response = Net::HTTP.get_response(uri)

    JSON.parse(response.body)
  end
end

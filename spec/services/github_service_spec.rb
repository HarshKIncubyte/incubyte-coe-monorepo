require "rails_helper"

RSpec.describe GithubService do
  describe "#fetch_user", :vcr do
    it "returns github user data for a valid username" do
      service = GithubService.new

      data = service.fetch_user("HarshKIncubyte")

      expect(data).to be_a(Hash)
      expect(data["login"]).to eq("HarshKIncubyte")
    end
  end
end

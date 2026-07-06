FactoryBot.define do
  factory :post do
    title { Faker::Lorem.sentence }
    body	{ Faker::Lorem.paragraph }
    published { false }
    association :user
  end
end

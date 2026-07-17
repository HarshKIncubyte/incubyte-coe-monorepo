# frozen_string_literal: true

module Mutations
  class CreateUser < BaseMutation
    description "Creates a new user"

    argument :name,  String, required: false
    argument :email, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [ String ], null: false

    def resolve(name: nil, email:)
      user = User.new(name: name, email: email)
      if user.save
        { user: user, errors: [] }
      else
        { user: nil, errors: user.errors.full_messages }
      end
    end
  end
end

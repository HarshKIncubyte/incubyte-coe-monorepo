# frozen_string_literal: true

module Mutations
  class DeleteUser < BaseMutation
    argument :id, ID, required: true

    field :success, Boolean, null: false
    field :errors,  [ String ], null: false

    def resolve(id:)
      user = User.find_by(id: id)
      return { success: false, errors: [ "User not found" ] } unless user

      user.destroy
      { success: true, errors: [] }
    end
  end
end

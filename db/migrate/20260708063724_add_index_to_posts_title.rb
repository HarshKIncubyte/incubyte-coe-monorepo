class AddIndexToPostsTitle < ActiveRecord::Migration[8.1]
  def change
    add_index :posts, :title
  end
end

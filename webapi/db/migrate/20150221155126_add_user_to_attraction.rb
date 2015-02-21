class AddUserToAttraction < ActiveRecord::Migration
  def change
    add_reference :attractions, :user, index: true
    add_foreign_key :attractions, :users
  end
end

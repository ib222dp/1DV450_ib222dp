class AddIndexToAttractionsAddress < ActiveRecord::Migration
  def change
    add_index :attractions, :address, unique: true
  end
end

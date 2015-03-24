class RemoveApikeyFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :apikey
  end
end

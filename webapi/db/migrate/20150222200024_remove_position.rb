class RemovePosition < ActiveRecord::Migration
  def change
    remove_column :attractions, :position_id
  end
end

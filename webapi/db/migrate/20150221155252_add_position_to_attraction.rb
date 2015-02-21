class AddPositionToAttraction < ActiveRecord::Migration
  def change
    add_reference :attractions, :position, index: true
    add_foreign_key :attractions, :positions
  end
end

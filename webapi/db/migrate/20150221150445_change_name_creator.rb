class ChangeNameCreator < ActiveRecord::Migration
  def change
    rename_table :creators, :users 
  end
end

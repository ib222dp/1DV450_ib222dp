class ChangeNameAttraction < ActiveRecord::Migration
  def change
    rename_column :attractions, :name, :address 
  end
end

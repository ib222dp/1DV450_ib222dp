class AddColumnToUser < ActiveRecord::Migration
  def change
    add_column :users, :apikey, :string
  end
end

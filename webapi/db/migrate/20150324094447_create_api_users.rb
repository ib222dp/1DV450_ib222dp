class CreateApiUsers < ActiveRecord::Migration
  def change
    create_table :api_users do |t|
      t.string :apikey

      t.timestamps null: false
    end
  end
end

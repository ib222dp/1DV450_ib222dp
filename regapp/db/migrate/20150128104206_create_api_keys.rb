class CreateApiKeys < ActiveRecord::Migration
  def change
    create_table :api_keys do |t|
      t.references :user, :admin

      t.string "api_key_value", :null => false
      
      t.timestamps
    end
  end
end

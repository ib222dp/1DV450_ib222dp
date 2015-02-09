class AddIndexToApiKeysApiKeyValue < ActiveRecord::Migration
  def change
    add_index :api_keys, :api_key_value, unique: true
  end
end

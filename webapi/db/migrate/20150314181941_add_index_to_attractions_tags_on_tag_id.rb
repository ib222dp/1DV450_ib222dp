class AddIndexToAttractionsTagsOnTagId < ActiveRecord::Migration
  def change
     add_index :attractions_tags, :tag_id
  end
end

class AddIndexAttractionsTagsOnAttractionId < ActiveRecord::Migration
  def change
    add_index :attractions_tags, :attraction_id
  end
end

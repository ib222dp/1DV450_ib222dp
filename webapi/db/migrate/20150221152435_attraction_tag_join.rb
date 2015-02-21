class AttractionTagJoin < ActiveRecord::Migration
  def change
    create_table 'attractions_tags', :id => false do|t|
      t.column 'attraction_id', :integer
      t.column "tag_id", :integer
    end
  end
end

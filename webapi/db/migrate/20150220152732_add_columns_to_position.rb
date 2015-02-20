class AddColumnsToPosition < ActiveRecord::Migration
  def change
    # http://stackoverflow.com/questions/1196174/correct-datatype-for-latitude-and-longitude-in-activerecord
    add_column :positions, :lat, :decimal, {:precision=>10, :scale=>6}
    add_column :positions, :lng, :decimal, {:precision=>10, :scale=>6}
  end
end

class Attraction < ActiveRecord::Base
  belongs_to :creator
  
  def serializable_hash (options={} )
    options = {
      only: [:name],
      methods: [:self_link]
      }.update(options)
    super(options)
    
    def self_link
      { :self => "#{Rails.configuration.baseurl}#{attraction_path(self)}" }
    end
end
